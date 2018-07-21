import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// Service
import { AlarmHistoryService } from '../../@shared/service/alarm_history.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';

// Third-party
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

// Environment
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-alarm-history',
  templateUrl: './alarm-history.component.html',
  styleUrls: ['./alarm-history.component.scss']
})
export class AlarmHistoryComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _router: Router,
    private _alarmHistoryService: AlarmHistoryService,
    private _menuDataService: MenuDataService) {

    this._menuDataService.updateSelectedMenu('alarm_history');

  }

  enable_auto_slide: boolean = environment.enableAutoSlide;
  displayedColumns = ['east', 'east_desc', 'west', 'west_desc', 'action', 'err_id', 'err_desc', 'timestamp'];
  dataSource: any = new MatTableDataSource();

  ngOnInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchData();
    this.autoRoute();

  }

  async autoRoute() {

    if (this.enable_auto_slide === true) {
      await this.delay(15000);
      this._router.navigate(['/']);
    }

  }

  delay(ms: number) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }

  fetchData() {

    this._alarmHistoryService.getAlarmHistory().then((data) => {
      if (data['status'] === 'error') {
        return;
      } else {
        this.dataSource.data = data;
      }
    });

  }

  exportCSV() {

    const filename = 'Alarm_history';
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: ['East', 'East Description', 'West', 'West Description', 'Action', 'Error ID', 'Error Description', 'Timestamp']
    };

    const export_file = new Angular5Csv(this.dataSource.data, filename, options);

  }

}
