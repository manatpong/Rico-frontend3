import { Component, OnInit } from '@angular/core';

// Service
import { DataService } from '../@shared/service/data.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-east-port-configuration',
  templateUrl: './east-port-configuration.component.html',
  styleUrls: ['./east-port-configuration.component.scss']
})
export class EastPortConfigurationComponent implements OnInit {


  constructor(private _dataService: DataService) { }

  east_description: string[];
  current_selected_east: number;
  connected_east_port: number[];
  first_row: object[] = _.chunk(_.range(1, 49), 4);
  second_row: object[] = _.chunk(_.range(49, 97), 4);
  third_row: object[] = _.chunk(_.range(97, 145), 4);

  ngOnInit() {

    this._dataService.east_port_desc.subscribe(data => this.east_description = data);
    this._dataService.connected_east_port.subscribe(data => this.connected_east_port = data);
    this._dataService.current_eastPort.subscribe(data => this.current_selected_east = data);

  }

  pushDescription(east_port: number) {

    const index = east_port - 1;
    return (this.east_description && this.east_description['status'] !== 'error') ? this.east_description[index]['description'] : '';

  }

  isConnectedPort(east_port: number) {

    return (this.connected_east_port && this.connected_east_port.includes(east_port)) ? 'connected-port' : '';

  }

  isSelectedPort(east_port: number) {

    return (this.current_selected_east === east_port) ? 'selected' : '';

  }

  selectPort(event) {

    this.current_selected_east = Number(event.currentTarget.id);
    this._dataService.changeEastPort(this.current_selected_east);
    this._dataService.changeEastDesc(this.east_description[this.current_selected_east - 1]['description']);

  }

  trackByFnRow(index, row) {

    return index;

  }

  trackByFnNum(index, num) {

    return index;

  }

}
