import { Component, OnInit } from '@angular/core';

// Service
import { DataService } from '../@shared/service/data.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-west-port-configuration',
  templateUrl: './west-port-configuration.component.html',
  styleUrls: ['./west-port-configuration.component.scss']
})
export class WestPortConfigurationComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  west_description: string[];
  current_selected_west: number;
  connected_west_port: number[];
  first_row: object[] = _.chunk(_.range(1, 49), 4);
  second_row: object[] = _.chunk(_.range(49, 97), 4);
  third_row: object[] = _.chunk(_.range(97, 145), 4);

  ngOnInit() {

    this._dataService.west_port_desc.subscribe(data => this.west_description = data);
    this._dataService.connected_west_port.subscribe(data => this.connected_west_port = data);
    this._dataService.current_westPort.subscribe(data => this.current_selected_west = data);

  }

  pushDescription(west_port: number) {

    const index = west_port - 1;
    return (this.west_description && this.west_description['status'] !== 'error') ? this.west_description[index]['description'] : '';

  }

  isConnectedPort(west_port: number) {

    return (this.connected_west_port && this.connected_west_port.includes(west_port)) ? 'connected-port' : '';

  }

  isSelectedPort(west_port: number) {

    return (this.current_selected_west === west_port) ? 'selected' : '';

  }

  selectPort(event) {

    const west_port = Number(event.currentTarget.id);
    this._dataService.changeWestPort(west_port);
    this._dataService.changeWestDesc(this.west_description[west_port - 1]['description']);

  }

  trackByFnRow(index, row) {

    return index;

  }

  trackByFnNum(index, num) {

    return index;

  }

}
