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
  selector: 'app-east-port-description-table',
  templateUrl: './east-port-description-table.component.html',
  styleUrls: ['./east-port-description-table.component.scss']
})
export class EastPortDescriptionTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _portConfiguration: PortConfigurationComponent,
    private _dataService: DataService,
    private _portService: PortService) { }

  selected_east_port_desc: string;
  selected_east_port: number;
  displayedColumns = ['port_number', 'description'];
  dataSource: any = new MatTableDataSource();

  ngOnInit() {

    this._dataService.current_eastPort.subscribe(selected_east_port => this.selected_east_port = selected_east_port);
    this._dataService.current_eastDesc.subscribe(selected_east_port_desc => this.selected_east_port_desc = selected_east_port_desc);
    this.fetchData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  fetchData() {

    this._portService.getEastDescription().then((data) => {
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

  changeSelectedEastPort(east_port?: number) {

    if (east_port) {
      this._dataService.changeEastPort(east_port);
      Promise.resolve(this.dataSource.data.find(object => object['port_number'] === east_port)).then((find_object) => {
        this._dataService.changeEastDesc(find_object['description']);
      });
    } else {
      this._dataService.changeEastPort(this.selected_east_port);
    }

  }

  changeSelectedEastPortDesc(description?: string) {

    if (description) {
      this._dataService.changeEastDesc(description);
      Promise.resolve(this.dataSource.data.find(object => object['description'] === description)).then((find_object) => {
        this._dataService.changeEastPort(find_object['port_number']);
      });
    } else {
      this._dataService.changeEastDesc(this.selected_east_port_desc);
    }
  }

  updateEastDescription() {

    this._portService.updateDescription('E', this.selected_east_port, this.selected_east_port_desc).then(() => {
      this._portConfiguration.fetchData();
      this.fetchData();
      this._dataService.changeEastPort(null);
      this._dataService.changeEastDesc(null);
    });

  }

  unlockUpdate() {

    return (this.selected_east_port && this.selected_east_port_desc) ? false : true;

  }

}
