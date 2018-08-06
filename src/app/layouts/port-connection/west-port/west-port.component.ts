import { PortService } from './../../../@shared/service/port.service';
import { Component, OnInit, Input } from '@angular/core';

// Service
import { PortConnectionDataService } from '../@shared/service/port_connection_data.service';

// Third-party
import * as _ from 'lodash';
import { PortConnectionService } from '../../../@shared/service/port-connection.service';
import { AuthenticationService } from '../../../@shared/service/authentication.service';

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
    private _portDataService: PortConnectionDataService,
    private _portConnectionService: PortConnectionService,
    private _authenticationService: AuthenticationService
  ) { }

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

  portStatus: any;
  select_toggle: boolean = false;
  current_user: object;

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
    this._portDataService.status.subscribe(data => this.portStatus = data);
    this._authenticationService.current_user_data.subscribe(data => this.current_user = data);

  }

  checkPortState(west_port: number) {
    if (this.current_selected_west == west_port && this.select_toggle == true) {
      return 'reserved';
    }
    else {
      if (this.portStatus[143 + west_port]['sid'] == -1) {
        return 'connected';
      } else if (this.portStatus[143 + west_port]['sid'] == 0) {
        return 'unavailable';
      } else if (this.portStatus[143 + west_port]['sid'] == 1) {
        return '';
      } else if (this.portStatus[143 + west_port]['sid'] == 2) {
        return 'reserved';
      } else if (this.portStatus[143 + west_port]['sid'] == 4){
        return 'pair';
      }
      else {
        return 'operating';
      }
    }
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

  // isPairSelected(west_port: number) {

  //   return (this.pair_selected && this.pair_selected === west_port) ? 'pair-selected' : '';

  // }

  // isPair(west_port: number) {

  //   return (this.port_pair_data && this.port_pair_data['west'] === west_port) ? 'pair' : '';

  // }

  // isUnavailablePort(west_port: number) {

  //   return (this.unavailable_port && this.unavailable_port['status'] !== 'error' && this.unavailable_port.includes(west_port))
  //     ? 'unavailable' : '';

  // }


  // isConnectedPort(west_port: number) {

  //   return (this.connected_west_port && this.connected_west_port.includes(west_port)) ? 'connected' : '';

  // }

  // isOperation(west_port: number) {

  //   return (this.operation_data && this.operation_data['status'] !== 'Idle' && this.operation_data['west'] === west_port)
  //     ? 'operating' : '';

  // }

  // isSelectedPort(west_port) {

  //   return (this.current_selected_west === west_port) ? 'selected' : '';

  // }

  selectPort(event, west_port) {

    if (this.select_toggle == true && this.current_selected_west == west_port) {
      this.select_toggle = false;
      this._portConnectionService.selectPort(this.current_user['username'], 'W', 'null', 30);
    } else {
      this.select_toggle = true;
      this._portConnectionService.selectPort(this.current_user['username'], 'W', west_port, 30).then((data) => {
      })

    }
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
    console.log(this.select_toggle, this.current_selected_west, west_port);

  }

  trackByFn(index, port) {

    return index;

  }

}
