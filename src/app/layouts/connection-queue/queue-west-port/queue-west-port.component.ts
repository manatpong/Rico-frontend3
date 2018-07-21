import { Component, OnInit } from '@angular/core';

// Component
import { ConnectionQueueDataService } from '../@shared/services/connection_queue_data.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-queue-west-port',
  templateUrl: './queue-west-port.component.html',
  styleUrls: ['./queue-west-port.component.scss']
})
export class QueueWestPortComponent implements OnInit {

  constructor(
    private _connectionQueueDataService: ConnectionQueueDataService) { }

  west_description: string;
  current_selected_west: number;
  pair_selected: number;
  connected_west_port: number[];
  unavailable_port: number[];
  connected_port_data: object[];
  operation_data: object;
  port_pair_data: object[];
  first_row: object[] = _.range(1, 25);
  second_row: object[] = _.range(25, 49);
  third_row: object[] = _.range(49, 73);
  fourth_row: object[] = _.range(73, 97);
  fifth_row: object[] = _.range(97, 121);
  six_row: object[] = _.range(121, 145);

  ngOnInit() {

    // this._connectionQueueDataService.unavailable_port.subscribe(data => this.unavailable_port = data);
    this._connectionQueueDataService.unavailable_west_port.subscribe(data => this.unavailable_port = data);
    this._connectionQueueDataService.connected_west_port.subscribe(data => this.connected_west_port = data);
    this._connectionQueueDataService.connected_port.subscribe(data => this.connected_port_data = data);
    this._connectionQueueDataService.current_selected_west.subscribe(data => this.current_selected_west = data);
    this._connectionQueueDataService.current_selected_pair.subscribe(data => this.port_pair_data = data);
    this._connectionQueueDataService.east_port_desc.subscribe(data => this.west_description = data);
    this._connectionQueueDataService.current_operation.subscribe(data => this.operation_data = data);

  }

  pushDescription(west_port: number) {

    if (!this.west_description || this.west_description['status'] === 'error') {
      return '';
    } else {
      const index = west_port - 1;
      return this.west_description[index]['description'];
    }

  }

  pairDescription(west_port: number) {

    if (!this.connected_port_data || this.connected_port_data['status'] === 'error') {
      return '';
    } else {
      const find_object = this.connected_port_data.find(object => object['west'] === west_port);
      if (find_object) {
        return 'Connect to ' + find_object['east_desc'];
      } else {
        return '';
      }
    }

  }

  isUnavailablePort(west_port: number) {

    if (!this.unavailable_port || this.unavailable_port['status'] === 'error') {
      return '';
    } else {
      return (this.unavailable_port.includes(west_port)) ? 'unavailable' : '';
    }

  }

  isPairSelected(west_port: number) {

    if (!this.pair_selected) {
      return '';
    } else {
      return (this.pair_selected === west_port) ? 'pair-selected' : '';
    }

  }

  isPair(west_port: number) {

    if (!this.port_pair_data) {
      return '';
    } else {
      return (this.port_pair_data['west'] === west_port) ? 'pair' : '';
    }

  }

  isConnectedPort(west_port: number) {

    if (!this.connected_west_port) {
      return '';
    } else {
      return (this.connected_west_port.includes(west_port)) ? 'connected' : '';
    }

  }

  isOperation(west_port: number) {

    if (!this.operation_data) {
      return '';
    } else {
      return (this.operation_data['status'] !== 'Idle' && this.operation_data['west'] === west_port) ? 'operating' : '';
    }

  }

  isSelectedPort(west_port: number) {

    return (this.current_selected_west === west_port) ? 'selected' : '';

  }

  selectPort(event) {

    this.current_selected_west = Number(event.currentTarget.id);
    const find_object = this.connected_port_data.find(object => object['west'] === this.current_selected_west);

    if (find_object) {
      this._connectionQueueDataService.changePair({ 'east': find_object['east'], 'west': find_object['west'] });
      this._connectionQueueDataService.changeSelectedWest(this.current_selected_west);
      this._connectionQueueDataService.changeActionType('disconnect');
      this.pair_selected = find_object['west'];
    } else {
      this._connectionQueueDataService.changePair(null);
      this._connectionQueueDataService.changeSelectedWest(this.current_selected_west);
      this.pair_selected = null;
      this._connectionQueueDataService.changeActionType('connect');
    }

  }

  trackByFn(index, port) {

    return index;

  }

}
