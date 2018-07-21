import { Component, OnInit } from '@angular/core';

// Service
import { DataService } from './@shared/service/data.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';
import { PortService } from '../../@shared/service/port.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-port-configuration',
  templateUrl: './port-configuration.component.html',
  styleUrls: ['./port-configuration.component.scss']
})
export class PortConfigurationComponent implements OnInit {

  constructor(
    private _dataService: DataService,
    private _menuDataService: MenuDataService,
    private _portService: PortService) {

    this._menuDataService.updateSelectedMenu('port_configuration');

  }

  ngOnInit() {

    this.fetchData();

  }

  fetchData() {

    this._portService.getConnectedPort().then((connected_port_data) => {
      this._dataService.fetchEastPortData(_.map(connected_port_data, 'east'));
      this._dataService.fetchWestPortData(_.map(connected_port_data, 'west'));
    });
    this._portService.getEastDescription().then((data) => {
      this._dataService.fetchEastPortDesc(data);
    });
    this._portService.getWestDescription().then((data) => {
      this._dataService.fetchWestPortDesc(data);
    });

  }

}
