import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { ConnectionQueueDataService } from './@shared/services/connection_queue_data.service';
import { ConnectionQueueService } from '../../@shared/service/connection_queue.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';
import { PortService } from '../../@shared/service/port.service';

// Third-porty
import * as _ from 'lodash';

// Environment
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-connection-queue',
  templateUrl: './connection-queue.component.html',
  styleUrls: ['./connection-queue.component.scss']
})
export class ConnectionQueueComponent implements OnInit, OnDestroy {

  constructor(
    private _router: Router,
    private _connectionQueueDataService: ConnectionQueueDataService,
    private _connectionQueueService: ConnectionQueueService,
    private _menuDataService: MenuDataService,
    private _portService: PortService) {

    this._menuDataService.updateSelectedMenu('connection_queue');

  }

  action_type: string;
  completion: number;
  completion_time: number;
  enable_auto_slide: boolean = environment.enableAutoSlide;
  operation_data: object;
  timerInterval: any;

  ngOnInit() {

    this._connectionQueueDataService.current_operation.subscribe(data => this.operation_data = data);
    // this.fetchUnavailablePort();
    this.fetchUnavailablePortSeparateDirection();
    this.fetchData();
    this.fetchOperation();
    this.fetchQueue();
    this.autoRoute();
    this.timerInterval = setInterval(() => {
      this.fecthConnectedPort(),
        this.fetchOperation();
    }, 1000);

  }

  ngOnDestroy() {

    clearInterval(this.timerInterval);

  }

  async autoRoute() {

    if (this.enable_auto_slide === true) {
      await this.delay(15000);
      this._router.navigate(['/current_connection']);
    }

  }

  delay(ms: number) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }

  fetchUnavailablePort() {

    this._portService.getUnavailablePort().then((unavailable_port_data) => {
      this._connectionQueueDataService.fetchUnavailablePortData(unavailable_port_data);
    });

  }

  fetchUnavailablePortSeparateDirection() {

    this._portService.getUnavailablePortSeparateDirection('east').then((unavailable_port_data) => {
      this._connectionQueueDataService.fetchUnavailableEastPortData(unavailable_port_data['east']);
    });

    this._portService.getUnavailablePortSeparateDirection('west').then((unavailable_port_data) => {
      this._connectionQueueDataService.fetchUnavailableWestPortData(unavailable_port_data['west']);
    });

  }

  fecthConnectedPort() {

    this._portService.getConnectedPort().then((connected_port_data) => {
      this._connectionQueueDataService.fetchPortData(connected_port_data);
      this._connectionQueueDataService.fetchEastPortData(_.map(connected_port_data, 'east'));
      this._connectionQueueDataService.fetchWestPortData(_.map(connected_port_data, 'west'));
    });

  }

  fetchData() {

    this._portService.getConnectedPort().then((connected_port_data) => {
      this._connectionQueueDataService.fetchPortData(connected_port_data);
      this._connectionQueueDataService.fetchEastPortData(_.map(connected_port_data, 'east'));
      this._connectionQueueDataService.fetchWestPortData(_.map(connected_port_data, 'west'));
      this._portService.getEastDescription().then((data) => {
        this._connectionQueueDataService.fetchEastPortDesc(data);
      });
      this._portService.getWestDescription().then((data) => {
        this._connectionQueueDataService.fetchWestPortDesc(data);
      });
    });

  }

  fetchQueue() {

    this._connectionQueueService.getQueue().then(data => {
      this._connectionQueueDataService.fetchQueue(data);
    });

  }

  fetchApproveQueue() {

    this._connectionQueueService.getAprroveQueue().then(data => {
      this._connectionQueueDataService.fetchApproveQueue(data);
    });

  }

  fetchOperation() {

    this._portService.getOperation().then((operation_data) => {
      if (operation_data['progress'] === '100') {
        this._connectionQueueDataService.updateRefreshApproveQueue(true);
      }
      this._connectionQueueDataService.fetchOperation(operation_data);
      this.action_type = operation_data['action'];
      this.completion = Number(operation_data['progress']);
      this.completion_time = operation_data['operation_time'];
    });

  }

}
