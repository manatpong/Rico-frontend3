import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// Component
import { PortConfigurationComponent } from '../port-configuration.component';

// Service
import { PortService } from '../../../@shared/service/port.service';
import { DataService } from '../@shared/service/data.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-west-port-description-table',
  templateUrl: './west-port-description-table.component.html',
  styleUrls: ['./west-port-description-table.component.scss']
})
export class WestPortDescriptionTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _portConfiguration: PortConfigurationComponent,
    private _dataService: DataService,
    private _portService: PortService) { }

  selected_west_port_desc: string;
  selected_west_port: number;
  displayedColumns = ['port_number', 'description'];
  dataSource: any = new MatTableDataSource();

  ngOnInit() {

    this._dataService.current_westPort.subscribe(data => this.selected_west_port = data);
    this._dataService.current_westDesc.subscribe(data => this.selected_west_port_desc = data);
    this.fetchData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  fetchData() {

    this._portService.getWestDescription().then((data) => {
      const return_data = [];
      _.each(data, (obj, index) => {
        return_data.push({ 'port_number': index + 1, 'description': obj['description'] });
      });
      return return_data;
    }).then((return_data) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = return_data;
    });

  }

  changeSelectedWestPort(west_port?: number) {

    if (west_port) {
      this._dataService.changeWestPort(west_port);
      Promise.resolve(this.dataSource.data.find(object => object['port_number'] === west_port)).then((find_object) => {
        this._dataService.changeWestDesc(find_object['description']);
      });
    } else {
      this._dataService.changeWestPort(this.selected_west_port);
    }

  }

  changeSelectedWestPortDesc(description?: string) {

    if (description) {
      this._dataService.changeWestDesc(description);
      Promise.resolve(this.dataSource.data.find(object => object['description'] === description)).then((find_object) => {
        this._dataService.changeWestPort(find_object['port_number']);
      });
    } else {
      this._dataService.changeWestDesc(this.selected_west_port_desc);
    }

  }

  updateWestDescription() {

    this._portService.updateDescription('W', this.selected_west_port, this.selected_west_port_desc).then(() => {
      this._portConfiguration.fetchData();
      this.fetchData();
      this._dataService.changeWestPort(null);
      this._dataService.changeWestDesc(null);
    });

  }

  unlockUpdate() {

    return (this.selected_west_port && this.selected_west_port_desc) ? false : true;

  }


}
