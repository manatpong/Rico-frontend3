import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Component
import { TotalConnectionComponent } from './total-connection/total-connection.component';

// Service
import { ConnectionHistoryService } from '../../@shared/service/connection_history.service';
import { DashboardDataService } from './@shared/services/dashboard_data.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';
import { PortService } from '../../@shared/service/port.service';

// Third-porty
import * as _ from 'lodash';

// Environment
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild(TotalConnectionComponent) _totalConnection;

  constructor(
    private _router: Router,
    private _connectionHistoryService: ConnectionHistoryService,
    private _dashboardDataService: DashboardDataService,
    private _menuDataService: MenuDataService,
    private _portService: PortService) {

    this._menuDataService.updateSelectedMenu('dashboard');

  }

  enable_auto_slide: boolean = environment.enableAutoSlide;
  timerInterval: any;

  ngOnInit() {

    this.fetchUnavailablePort();
    this.fetchUnavailablePortSeparateDirection();
    this.fetchData();
    this.fetchOperation();
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
      await this.delay(7000);
      this._router.navigate(['/port_connection']);
    }

  }

  delay(ms: number) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }

  fetchUnavailablePort() {

    this._portService.getUnavailablePort().then((unavailable_port_data) => {
      if (unavailable_port_data['status'] === 'error') {
        this._dashboardDataService.fetchUnavailablePortData(null);
      } else {
        this._dashboardDataService.fetchUnavailablePortData(unavailable_port_data);
      }
    });

  }

  fetchUnavailablePortSeparateDirection() {

    this._portService.getUnavailablePortSeparateDirection('east').then((unavailable_port_data) => {
      this._dashboardDataService.fetchUnavailableEastPortData(unavailable_port_data['east']);
    });

    this._portService.getUnavailablePortSeparateDirection('west').then((unavailable_port_data) => {
      this._dashboardDataService.fetchUnavailableWestPortData(unavailable_port_data['west']);
    });

  }

  fecthConnectedPort() {

    this._portService.getConnectedPort().then((connected_port_data) => {
      if (connected_port_data['status'] === 'error') {
        this._dashboardDataService.fetchPortData(null);
      } else {
        this._dashboardDataService.fetchPortData(connected_port_data);
        this._dashboardDataService.fetchEastPortData(_.map(connected_port_data, 'east'));
        this._dashboardDataService.fetchWestPortData(_.map(connected_port_data, 'west'));
      }
    });

  }

  fetchData() {

    this._portService.getConnectedPort().then((connected_port_data) => {
      if (connected_port_data['status'] === 'error') {
        this._dashboardDataService.fetchPortData(null);
      } else {
        this._dashboardDataService.fetchPortData(connected_port_data);
        this._dashboardDataService.fetchEastPortData(_.map(connected_port_data, 'east'));
        this._dashboardDataService.fetchWestPortData(_.map(connected_port_data, 'west'));
      }

      this._portService.getEastDescription().then((data) => {
        if (data['status'] === 'error') {
          this._dashboardDataService.fetchEastPortDesc(null);
        } else {
          this._dashboardDataService.fetchEastPortDesc(data);
        }
      });

      this._portService.getWestDescription().then((data) => {
        if (data['status'] === 'error') {
          this._dashboardDataService.fetchWestPortDesc(null);
        } else {
          this._dashboardDataService.fetchWestPortDesc(data);
        }
      });
    });

  }

  fetchOperation() {

    this._portService.getOperation().then((operation_data) => {
      if (operation_data['status'] === 'error') {
        this._dashboardDataService.fetchOperation(
          {
            'status': 'Idle',
            'error': null,
            'action': 'No data',
            'east': 'No data',
            'west': 'No data',
            'progress': 'No data',
            'operation_time': 'No data'
          });
      } else {
        this._dashboardDataService.fetchOperation(operation_data);
      }
    });

  }

  fetchConnectionHistory() {

    this._connectionHistoryService.getConnectionHistory().then((connection_history_data) => {
      this._dashboardDataService.fetchConnectionHistory(connection_history_data);
    });

  }

}
