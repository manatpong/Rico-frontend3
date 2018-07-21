import { DebuggingSystemRestartComponent } from './../../debugging/debugging-system-restart.component';
import { DebuggingService } from './../../../@shared/service/debugging.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-system-restart-schedule',
  templateUrl: './system-restart-schedule.component.html',
  styleUrls: ['./system-restart-schedule.component.scss']
})
export class SystemRestartScheduleComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
    private _dialog: MatDialog,
    private _debuggingService: DebuggingService) { }

  displayedColumns = [
    'day',
    'datetime',
    'enable'
  ];
  dataSource: any = new MatTableDataSource();

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchSystemRestartInfo();
  }

  fetchSystemRestartInfo() {

    this._debuggingService.getSystemRestartInfo().then((data) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
    });
  }

  openDialogSystemRestart(day: string) {
    const dialog = this._dialog.open(DebuggingSystemRestartComponent);
    dialog.afterClosed()
    
      .subscribe(result => {
        const array_result = result.split(',').map(Number);
        console.log(day,array_result[0],array_result[1])
        this._debuggingService.changeSystemRestartDatetime(day, array_result[0], array_result[1]).then(() => {
          this.fetchSystemRestartInfo();
        });
      })
  }

  changeSystemRestartStatus(day: string, enable: boolean) {
    if (enable === true) {
      this._debuggingService.changeSystemRestartStatus(day, 0).then((obj) => {
        this.fetchSystemRestartInfo();
      });
    } else {
      this._debuggingService.changeSystemRestartStatus(day, 1).then((obj) => {
        this.fetchSystemRestartInfo();
      });
    }
  }

}
