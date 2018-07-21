import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Component
import { EastPortComponent } from './east-port/east-port.component';
import { WestPortComponent } from './west-port/west-port.component';

// Service
import { AuthenticationService } from '../../@shared/service/authentication.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';
import { PortConnectionDataService } from './@shared/service/port_connection_data.service';
import { PortConnectionService } from '../../@shared/service/port-connection.service';
import { PortService } from '../../@shared/service/port.service';

// Third-party
import * as _ from 'lodash';

// Environment
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-port-connection',
  templateUrl: './port-connection.component.html',
  styleUrls: ['./port-connection.component.scss']
})
export class PortConnectionComponent implements OnInit, OnDestroy {

  @ViewChild(EastPortComponent) _east;
  @ViewChild(WestPortComponent) _west;

  constructor(
    private _authenticationService: AuthenticationService,
    private _menuDataService: MenuDataService,
    private _portConnectionService: PortConnectionService,
    private _portDataService: PortConnectionDataService,
    private _portService: PortService,
    private _router: Router) {

    this._menuDataService.updateSelectedMenu('port_connection');

  }

  user_data: string;
  current_action: string;
  current_selected_east: number;
  current_selected_west: number;
  completion: number;
  operation_time: number;
  completion_time: number;
  enable_debug: boolean = environment.enableDebugging;
  enable_auto_slide: boolean = environment.enableAutoSlide;
  port_pair_data: object;
  operation_data: object;
  sequence_data: object;
  timerInterval: any;

  ngOnInit() {

    this._authenticationService.current_user_data.subscribe(data => this.user_data = data);
    this._portDataService.current_selected_east.subscribe(data => this.current_selected_east = data);
    this._portDataService.current_selected_west.subscribe(data => this.current_selected_west = data);
    this._portDataService.current_selected_pair.subscribe(data => this.port_pair_data = data);
    this._portDataService.current_operation.subscribe(data => this.operation_data = data);
    this._portDataService.current_operation_time.subscribe(data => this.operation_time = data);
    this._portDataService.sequence_data.subscribe(data => this.sequence_data = data);
    // this.fetchUnavailablePort();
    this.fetchUnavailablePortSeparateDirection();
    this.fetchData();
    this.fetchOperation();
    this.fetchSequence();
    this.autoRoute();
    this.timerInterval = setInterval(() => {
      this.fecthConnectedPort(),
        this.fetchOperation(),
        this.fetchSequence();
    }, 1500);

  }

  ngOnDestroy() {

    clearInterval(this.timerInterval);

  }

  async autoRoute() {

    if (this.enable_auto_slide === true) {
      await this.delay(7000);
      this._router.navigate(['/current_connection']);
    }

  }

  delay(ms: number) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }

  fetchUnavailablePort() {

    this._portService.getUnavailablePort().then((unavailable_port_data) => {
      this._portDataService.fetchUnavailablePortData(unavailable_port_data);
    });

  }

  fetchUnavailablePortSeparateDirection() {

    this._portService.getUnavailablePortSeparateDirection('east').then((unavailable_port_data) => {
      this._portDataService.fetchUnavailableEastPortData(unavailable_port_data['east']);
    });

    this._portService.getUnavailablePortSeparateDirection('west').then((unavailable_port_data) => {
      this._portDataService.fetchUnavailableWestPortData(unavailable_port_data['west']);
    });

  }

  fecthConnectedPort() {

    this._portService.getConnectedPort().then((connected_port_data) => {
      this._portDataService.fetchPortData(connected_port_data);
      this._portDataService.fetchEastPortData(_.map(connected_port_data, 'east'));
      this._portDataService.fetchWestPortData(_.map(connected_port_data, 'west'));
    });

  }

  fetchData() {

    this._portService.getConnectedPort().then((connected_port_data) => {
      this._portDataService.fetchPortData(connected_port_data);
      this._portDataService.fetchEastPortData(_.map(connected_port_data, 'east'));
      this._portDataService.fetchWestPortData(_.map(connected_port_data, 'west'));
    });
    this._portService.getEastDescription().then((data) => {
      this._portDataService.fetchEastPortDesc(data);
    });
    this._portService.getWestDescription().then((data) => {
      this._portDataService.fetchWestPortDesc(data);
    });

  }

  fetchOperation() {

    this._portService.getOperation().then((operation_data) => {
      this._portDataService.fetchOperation(operation_data),
        this.current_action = operation_data['action'],
        this.completion = Number(operation_data['progress']);
      this.completion_time = Number(operation_data['operation_time']);
    });

  }

  fetchSequence() {

    if (this.operation_data && this.operation_data['status'] === 'Working') {
      this._portConnectionService.getSequences().then((sequence_data) => {
        if (!_.isEqual(this.sequence_data, sequence_data)) {
          this._portDataService.fetchSequence(sequence_data);
        }
      });
    }

  }

  isActiveConnectStatus() {

    return (this._east.unlock_connect_button && this._west.unlock_connect_button
      && this.current_selected_east && this.current_selected_west) ? 'active-status' : 'unactive-status';

  }

  isActiveDisconnectStatus() {

    return (this.port_pair_data && this.current_selected_east && this.current_selected_west
      && this.port_pair_data['east'] === this.current_selected_east && this.port_pair_data['west'] === this.current_selected_west
      && (this._east.unlock_disconnect_button || this._west.unlock_disconnect_button))
      ? 'active-status' : 'unactive-status';

  }

  unlockConnect() {

    return (this._east.unlock_connect_button && this._west.unlock_connect_button
      && this.current_selected_east && this.current_selected_west) ? true : false;

  }

  unlockDisconnect() {

    return (this.port_pair_data && this.current_selected_east && this.current_selected_west
      && this.port_pair_data['east'] === this.current_selected_east && this.port_pair_data['west'] === this.current_selected_west
      && (this._east.unlock_disconnect_button || this._west.unlock_disconnect_button))
      ? true : false;

  }

  createConnect() {

    this._portConnectionService.createConnection(this.current_selected_east, this.current_selected_west,
      'connect', this.user_data['username']);
    this._portDataService.changeSelectedEast(null);
    this._portDataService.changeSelectedWest(null);
    this._east.pair_selected = null;
    this._west.pair_selected = null;
    this._portDataService.changePair(null);

  }

  createDisconnect() {

    this._portConnectionService.createConnection(this.current_selected_east, this.current_selected_west,
      'disconnect', this.user_data['username']);
    this._portDataService.changeSelectedEast(null);
    this._portDataService.changeSelectedWest(null);
    this._east.pair_selected = null;
    this._west.pair_selected = null;
    this._portDataService.changePair(null);

  }

}
