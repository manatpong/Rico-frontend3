import { Component, OnInit } from '@angular/core';

// Service
import { ConnectionQueueDataService } from '../@shared/services/connection_queue_data.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-queue-east-port',
  templateUrl: './queue-east-port.component.html',
  styleUrls: ['./queue-east-port.component.scss']
})
export class QueueEastPortComponent implements OnInit {

  constructor(
    private _connectionQueueDataService: ConnectionQueueDataService) { }

  east_description: string;
  current_selected_east: number;
  pair_selected: number;
  connected_east_port: number[];
  unavailable_port: number[];
  connected_port_data: object[];
  operation_data: object;
  port_pair_data: object;
  first_row: object[] = _.range(1, 25);
  second_row: object[] = _.range(25, 49);
  third_row: object[] = _.range(49, 73);
  fourth_row: object[] = _.range(73, 97);
  fifth_row: object[] = _.range(97, 121);
  six_row: object[] = _.range(121, 145);

  ngOnInit() {

    // this._connectionQueueDataService.unavailable_port.subscribe(data => this.unavailable_port = data);
    this._connectionQueueDataService.unavailable_east_port.subscribe(data => this.unavailable_port = data);
    this._connectionQueueDataService.connected_east_port.subscribe(data => this.connected_east_port = data);
    this._connectionQueueDataService.connected_port.subscribe(data => this.connected_port_data = data);
    this._connectionQueueDataService.current_selected_east.subscribe(data => this.current_selected_east = data);
    this._connectionQueueDataService.current_selected_pair.subscribe(data => this.port_pair_data = data);
    this._connectionQueueDataService.east_port_desc.subscribe(data => this.east_description = data);
    this._connectionQueueDataService.current_operation.subscribe(data => this.operation_data = data);

  }

  pushDescription(east_port: number) {

    if (!this.east_description || this.east_description['status'] === 'error') {
      return '';
    } else {
      const index = east_port - 1;
      return this.east_description[index]['description'];
    }

  }

  pairDescription(east_port: number) {

    if (!this.connected_port_data || this.connected_port_data['status'] === 'error') {
      return '';
    } else {
      const find_object = this.connected_port_data.find(object => object['east'] === east_port);
      if (find_object) {
        return 'Connect to ' + find_object['west_desc'];
      } else {
        return '';
      }
    }

  }

  isUnavailablePort(east_port: number) {

    if (!this.unavailable_port || this.unavailable_port['status'] === 'error') {
      return '';
    } else {
      return (this.unavailable_port.includes(east_port)) ? 'unavailable' : '';
    }

  }

  isPairSelected(east_port: number) {

    if (!this.pair_selected) {
      return '';
    } else {
      return (this.pair_selected === east_port) ? 'pair-selected' : '';
    }

  }

  isPair(east_port: number) {

    if (!this.port_pair_data) {
      return '';
    } else {
      return (this.port_pair_data['east'] === east_port) ? 'pair' : '';
    }

  }

  isConnectedPort(east_port: number) {

    if (!this.connected_east_port) {
      return '';
    } else {
      return (this.connected_east_port.includes(east_port)) ? 'connected' : '';
    }

  }

  isOperation(east_port: number) {

    if (!this.operation_data) {
      return '';
    } else {
      return (this.operation_data['status'] !== 'Idle' && this.operation_data['east'] === east_port) ? 'operating' : '';
    }

  }

  isSelectedPort(east_port: number) {

    return (this.current_selected_east === east_port) ? 'selected' : '';

  }

  selectPort(event) {

    this.current_selected_east = Number(event.currentTarget.id);
    const find_object = this.connected_port_data.find(object => object['east'] === this.current_selected_east);

    if (find_object) {
      this._connectionQueueDataService.changePair({ 'east': find_object['east'], 'west': find_object['west'] });
      this._connectionQueueDataService.changeSelectedEast(this.current_selected_east);
      this._connectionQueueDataService.changeActionType('disconnect');
      this.pair_selected = find_object['east'];
    } else {
      this._connectionQueueDataService.changePair(null),
        this._connectionQueueDataService.changeSelectedEast(this.current_selected_east),
        this.pair_selected = null,
        this._connectionQueueDataService.changeActionType('connect');
    }

  }

  trackByFn(index, port) {

    return index;

  }

}
