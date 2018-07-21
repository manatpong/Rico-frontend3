import { Component, OnInit } from '@angular/core';

// Service
import { DashboardDataService } from '../@shared/services/dashboard_data.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-front-panel',
  templateUrl: './front-panel.component.html',
  styleUrls: ['./front-panel.component.scss']
})
export class FrontPanelComponent implements OnInit {

  // FRONT PANEL
  connected_east_port: number[];
  connected_west_port: number[];
  unavailable_port: number[];
  unavailable_east_port: number[];
  unavailable_west_port: number[];
  operation_data: object;
  first_row: object[] = _.chunk(_.range(1, 49), 4);
  second_row: object[] = _.chunk(_.range(49, 97), 4);
  third_row: object[] = _.chunk(_.range(97, 145), 4);

  constructor(
    private _dashboardDataService: DashboardDataService) { }

  ngOnInit() {

    this._dashboardDataService.unavailable_port.subscribe(data => this.unavailable_port = data);
    this._dashboardDataService.unavailable_east_port.subscribe(data => this.unavailable_east_port = data);
    this._dashboardDataService.unavailable_west_port.subscribe(data => this.unavailable_west_port = data);
    this._dashboardDataService.connected_east_port.subscribe(data => this.connected_east_port = data);
    this._dashboardDataService.connected_west_port.subscribe(data => this.connected_west_port = data);
    this._dashboardDataService.current_operation.subscribe(data => this.operation_data = data);

  }

  isUnavailablePort(port_number: number) {

    return (this.unavailable_port && this.unavailable_port.includes(port_number))
      ? 'unavailable-port' : '';

  }

  isUnavailableEastPort(east_port: number) {

    return (this.unavailable_east_port && this.unavailable_east_port.includes(east_port))
      ? 'unavailable-port' : '';

  }

  isUnavailableWestPort(west_port: number) {

    return (this.unavailable_west_port && this.unavailable_west_port.includes(west_port)) ? 'unavailable-port' : '';

  }

  isConnectedEastPort(east_port: number) {

    return (this.connected_east_port && this.connected_east_port.includes(east_port)) ? 'connected-port' : '';

  }

  isConnectedWestPort(west_port: number) {

    return (this.connected_west_port && this.connected_west_port.includes(west_port)) ? 'connected-port' : '';

  }

  isOperationEast(east_port: number) {

    return (this.operation_data && this.operation_data['status'] !== 'Idle' && this.operation_data['east'] === east_port)
      ? 'operation-port' : '';

  }

  isOperationWest(west_port: number) {

    return (this.operation_data && this.operation_data['status'] !== 'Idle' && this.operation_data['west'] === west_port)
      ? 'operation-port' : '';

  }

}
