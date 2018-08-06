import { AppComponent } from './../../../app.component';
import { PageDataService } from './../../../@shared/service/page_data.service';
import { AuthenticationService } from './../../../@shared/service/authentication.service';
import { PortConnectionService } from './../../../@shared/service/port-connection.service';
import { Component, OnInit, Input } from '@angular/core';

// Service
import { PortConnectionDataService } from '../@shared/service/port_connection_data.service';
import { PortService } from './../../../@shared/service/port.service';


// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-east-port',
  templateUrl: './east-port.component.html',
  styleUrls: ['./east-port.component.scss']
})
export class EastPortComponent implements OnInit {

  @Input() pair_selected: number;
  @Input() unlock_connect_button: boolean;
  @Input() unlock_disconnect_button: boolean;

  constructor(
    private _portDataService: PortConnectionDataService,
    private _portConnectionService: PortConnectionService,
    private _portService: PortService,
    private _authenticationService: AuthenticationService,
    private _pageDataService: PageDataService,
    private _app: AppComponent
  ) { }

  east_description: string[];
  current_selected_east: number;
  current_selected_west: number;
  connected_east_port: number[];
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
  current_user: object;

  select_toggle: boolean = false;
  select_port: number;
  portState: number;
  portObject: object[];
  timerInterval: any;
  portStatus: object[];
  focusPage: boolean;

  ngOnInit() {
    this.unlock_connect_button = false;
    this.unlock_disconnect_button = false;
    // this._portDataService.unavailable_port.subscribe(data => this.unavailable_port = data);
    this._portDataService.unavailable_east_port.subscribe(data => this.unavailable_port = data);
    this._portDataService.connected_east_port.subscribe(data => this.connected_east_port = data);
    this._portDataService.connected_port.subscribe(data => this.connected_port_data = data);
    this._portDataService.current_selected_east.subscribe(data => this.current_selected_east = data);
    this._portDataService.current_selected_west.subscribe(data => this.current_selected_west = data);
    this._portDataService.current_selected_pair.subscribe(data => this.port_pair_data = data);
    this._portDataService.east_port_desc.subscribe(data => this.east_description = data);
    this._portDataService.current_operation.subscribe(data => this.operation_data = data);
    this._portDataService.port_status.subscribe(data => this.portState = data);
    this._authenticationService.current_user_data.subscribe(data => this.current_user = data);
    this._portDataService.status.subscribe(data => this.portStatus = data);
    this.fecthPorts();
    this.timerInterval = setInterval(() => {
      this.fetchPortStatus();
    }, 500);
    
    this._pageDataService.focus_page.subscribe((data) => this.focusPage = data);
  }

  fecthPorts() {
    this._portService.getPorts().then((data) => {
      this.portObject = data;
      this._portDataService.changePort(this.portObject)
    })
  }

  

  fetchPortStatus() {
    this._portService.getPortStatus().then((data) => {
      // this.portStatus = data;
      this._portDataService.changePortStatus(data)
    })
  }

  checkPortState(east_port: number) {
    if (this.current_selected_east == east_port && this.select_toggle == true) {
      return 'reserved';
    }
    else {
      if (this.portStatus[east_port - 1]['sid'] == -1) {
        return 'connected';
      } else if (this.portStatus[east_port - 1]['sid'] == 0) {
        return 'unavailable';
      } else if (this.portStatus[east_port - 1]['sid'] == 1) {
        return '';
      } else if (this.portStatus[east_port - 1]['sid'] == 2) {
        return 'reserved';
      } else if (this.portStatus[east_port - 1]['sid'] == 4) {
        return 'pair';
      } else {
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

  pushDescription(east_port: number) {

    const index = east_port - 1;
    return (this.east_description && this.east_description['status'] !== 'error') ? this.east_description[index]['description'] : '';

  }

  pairDescription(east_port: number) {

    if (this.connected_port_data && this.connected_port_data['status'] !== 'error') {
      const find_object = this.connected_port_data.find(object => object['east'] === east_port);
      return (find_object) ? find_object['west_desc'] : '';
    }

  }

  isPairSelected(east_port: number) {

    return (this.pair_selected && this.pair_selected === east_port && this.select_toggle == true) ? 'pair-selected' : '';

  }

  isPair(east_port: number) {

    return (this.port_pair_data && this.port_pair_data['east'] === east_port && this.select_toggle == true) ? 'pair' : '';

  }

  // isUnavailablePort(east_port: number) {

  //   return (this.unavailable_port && this.unavailable_port['status'] !== 'error' && this.unavailable_port.includes(east_port))
  //     ? 'unavailable' : '';

  // }

  // isConnectedPort(east_port: number) {

  //   return (this.connected_east_port && this.connected_east_port.includes(east_port)) ? 'connected' : '';

  // }

  // isOperation(east_port: number) {

  //   return (this.operation_data && this.operation_data['status'] !== 'Idle' && this.operation_data['east'] === east_port)
  //     ? 'operating' : '';

  // }

  // isSelectedPort(east_port: number) {
  //   return (east_port == this.select_port) ? 'selected' : '';
  // }

  // checkPortState(east_port: number) {
  //   if (this.portStatus[east_port - 1]['sid'] == -1) {
  //     return 'connected';
  //   }
  //   if (this.portStatus[east_port - 1]['sid'] == 0) {
  //     return 'unavailable';
  //   }
  //   if (this.portStatus[east_port - 1]['sid'] == 1) {
  //     return '';
  //   }
  //   if (this.current_selected_east == east_port && this.select_toggle == true) {
  //     return 'reserved';
  //   }
  //   if (this.portStatus[east_port - 1]['sid'] == 3) {
  //     return 'operating';
  //   }

  // }

  selectPort(event, east_port: number) {

    if (this.select_toggle == true && this.current_selected_east == east_port) {
      this.select_toggle = false;
      this._portConnectionService.selectPort(this.current_user['username'], 'E', 'null', 30);
    } else {
      this.select_toggle = true;
      this._portConnectionService.selectPort(this.current_user['username'], 'E', east_port, 30).then((data) => {
      })
    }


    this.current_selected_east = Number(event.currentTarget.id);
    const find_object = this.connected_port_data.find(object => object['east'] === this.current_selected_east);

    if (find_object) {
      this._portDataService.changePair({ 'east': find_object['east'], 'west': find_object['west'] });
      this._portDataService.changeSelectedEast(this.current_selected_east);
      this.pair_selected = this.current_selected_east;
      this.unlock_connect_button = false;
      this.unlock_disconnect_button = true;
    } else {
      this._portDataService.changePair(null);
      this.pair_selected = null;
      this.unlock_disconnect_button = false;
      this.unlock_connect_button = true;
      this._portDataService.changeSelectedEast(this.current_selected_east);
    }
    console.log(this.select_toggle, this.current_selected_east, east_port);

  }

  trackByFn(index, port) {

    return index;

  }

}
