import { Component, OnInit, Input } from '@angular/core';

// Service
import { PortConnectionDataService } from '../@shared/service/port_connection_data.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-west-port',
  templateUrl: './west-port.component.html',
  styleUrls: ['./west-port.component.scss']
})
export class WestPortComponent implements OnInit {

  @Input() pair_selected: number;
  @Input() unlock_connect_button: boolean;
  @Input() unlock_disconnect_button: boolean;

  constructor(
    private _portDataService: PortConnectionDataService) { }

  west_description: string[];
  current_selected_east: number;
  current_selected_west: number;
  connected_west_port: number[];
  unavailable_port: number[];
  operation_data: object;
  port_pair_data: object;
  connected_port_data: object[];
  first_row: object[] = _.range(1, 25);
  second_row: object[] = _.range(25, 49);
  third_row: object[] = _.range(49, 73);
  fourth_row: object[] = _.range(73, 97);
  fifth_row: object[] = _.range(97, 121);
  six_row: object[] = _.range(121, 145);

  ngOnInit() {

    this.unlock_connect_button = false;
    this.unlock_disconnect_button = false;
    // this._portDataService.unavailable_port.subscribe(data => this.unavailable_port = data);
    this._portDataService.unavailable_west_port.subscribe(data => this.unavailable_port = data);
    this._portDataService.connected_west_port.subscribe(data => this.connected_west_port = data);
    this._portDataService.connected_port.subscribe(data => this.connected_port_data = data);
    this._portDataService.current_selected_east.subscribe(data => this.current_selected_east = data);
    this._portDataService.current_selected_west.subscribe(data => this.current_selected_west = data);
    this._portDataService.current_selected_pair.subscribe(data => this.port_pair_data = data);
    this._portDataService.west_port_desc.subscribe(data => this.west_description = data);
    this._portDataService.current_operation.subscribe(data => this.operation_data = data);

  }

  lockPortPanel() {

    return (this.operation_data && this.operation_data['status'] !== 'Idle') ? 'lock-panel' : '';

  }

  hideSpinner() {

    return (this.operation_data && this.operation_data['status'] !== 'Idle') ? '' : 'hide-spinner';

  }

  pushDescription(west_port: number) {

    const index = west_port - 1;
    return (this.west_description && this.west_description['status'] !== 'error') ? this.west_description[index]['description'] : '';

  }

  pairDescription(west_port: number) {

    if (this.connected_port_data && this.connected_port_data['status'] !== 'error') {
      const find_object = this.connected_port_data.find(object => object['west'] === west_port);
      return (find_object) ? find_object['east_desc'] : '';
    }

  }

  isPairSelected(west_port: number) {

    return (this.pair_selected && this.pair_selected === west_port) ? 'pair-selected' : '';

  }

  isPair(west_port: number) {

    return (this.port_pair_data && this.port_pair_data['west'] === west_port) ? 'pair' : '';

  }

  isUnavailablePort(west_port: number) {

    return (this.unavailable_port && this.unavailable_port['status'] !== 'error' && this.unavailable_port.includes(west_port))
      ? 'unavailable' : '';

  }


  isConnectedPort(west_port: number) {

    return (this.connected_west_port && this.connected_west_port.includes(west_port)) ? 'connected' : '';

  }

  isOperation(west_port: number) {

    return (this.operation_data && this.operation_data['status'] !== 'Idle' && this.operation_data['west'] === west_port)
      ? 'operating' : '';

  }

  isSelectedPort(west_port) {

    return (this.current_selected_west === west_port) ? 'selected' : '';

  }

  selectPort(event) {

    this.current_selected_west = Number(event.currentTarget.id);
    const find_object = this.connected_port_data.find(object => object['west'] === this.current_selected_west);

    if (find_object) {
      this._portDataService.changePair({ 'east': find_object['east'], 'west': find_object['west'] });
      this._portDataService.changeSelectedWest(this.current_selected_west);
      this.pair_selected = this.current_selected_west;
      this.unlock_connect_button = false;
      this.unlock_disconnect_button = true;
    } else {
      this._portDataService.changePair(null);
      this.pair_selected = null;
      this.unlock_disconnect_button = false;
      this.unlock_connect_button = true;
      this._portDataService.changeSelectedWest(this.current_selected_west);
    }

  }

  trackByFn(index, port) {

    return index;

  }

}
