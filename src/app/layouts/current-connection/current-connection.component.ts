import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// Service
import { CurrentConnectionService } from '../../@shared/service/current_connection.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';

// Third-party
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

// Environment
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-current-connection',
  templateUrl: './current-connection.component.html',
  styleUrls: ['./current-connection.component.scss']
})
export class CurrentConnectionComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _router: Router,
    private _currentConnectionService: CurrentConnectionService,
    private _menuDataService: MenuDataService) {

    this._menuDataService.updateSelectedMenu('current_connection');

  }

  enable_auto_slide: boolean = environment.enableAutoSlide;
  displayedColumns = [
    'east',
    'east_desc',
    'east_count',
    'west',
    'west_desc',
    'west_count',
    'timestamp'
  ];
  dataSource: any = new MatTableDataSource();

  ngOnInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchData();
    this.autoRoute();

  }

  async autoRoute() {

    if (this.enable_auto_slide === true) {
      await this.delay(7000);
      this._router.navigate(['/connection_history']);
    }

  }

  delay(ms: number) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }

  fetchData() {

    this._currentConnectionService.getConnected().then((data) => {
      if (data['status'] === 'error') {
        return;
      } else {
        this.dataSource.data = data;
      }
    });

  }

  exportCSV() {

    const filename = 'Current_connection';
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: [
        'East',
        'East Description',
        'East Count',
        'West',
        'West Description',
        'West Count',
        'Date'
      ]
    };

    const export_file = new Angular5Csv(this.dataSource.data, filename, options);

  }

}
