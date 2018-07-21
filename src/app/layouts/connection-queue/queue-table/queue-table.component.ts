import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// Component
import { RemarkDialogComponent } from '../remark-dialog/remark-dialog.component';

// Service
import { AuthenticationService } from '../../../@shared/service/authentication.service';
import { ConnectionQueueDataService } from '../@shared/services/connection_queue_data.service';
import { ConnectionQueueService } from '../../../@shared/service/connection_queue.service';

@Component({
  selector: 'app-queue-table',
  templateUrl: './queue-table.component.html',
  styleUrls: ['./queue-table.component.scss']
})
export class QueueTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _authenticationService: AuthenticationService,
    private _connectionQueueDataService: ConnectionQueueDataService,
    private _connectionQueueService: ConnectionQueueService) { }

  user_data: string;
  selected_east_port_desc: string;
  selected_east_port: number;
  is_refresh: boolean;
  displayedColumns = [
    'queue',
    'east_port',
    'east_desc',
    'west_port',
    'west_desc',
    'action',
    'schedule',
    'requester',
    'approve',
    'status'
  ];
  dataSource: any = new MatTableDataSource();
  timerInterval: any;

  ngOnInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this._authenticationService.current_user_data.subscribe(data => this.user_data = data);
    this._connectionQueueDataService.refresh_queue_table.subscribe(data => this.is_refresh = data);
    this.fetchData();
    this.timerInterval = setInterval(() => {
      this.checkRefresh();
    }, 1000);

  }

  ngOnDestroy() {

    clearInterval(this.timerInterval);

  }

  fetchData() {

    this._connectionQueueService.getQueue().then(data => {
      this.dataSource.data = data;
    });

  }

  async checkRefresh() {

    if (this.is_refresh === true) {
      this.refresh();
      this._connectionQueueDataService.updateRefreshQueue(false);
    }

  }

  async refresh() {

    this._connectionQueueService.getQueue().then((data => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
    }));

  }

  approveQueue(object) {

    const dialog = this._dialog.open(RemarkDialogComponent);

    dialog.afterClosed()
      .subscribe(remark_message => {
        if (remark_message !== undefined) {
          this.refreshApproveQueue(object, remark_message);
        }
      });

  }

  rejectQueue(object) {

    const dialog = this._dialog.open(RemarkDialogComponent);

    dialog.afterClosed()
      .subscribe(remark_message => {
        if (remark_message !== undefined) {
          this.refreshRejectQueue(object, remark_message);
        }
      });

  }

  async refreshApproveQueue(object, remark_message) {

    this._connectionQueueService.approveQueue(object.id, this.user_data['username'], 1, remark_message);
    await this.delay(500);
    this.refresh();
    this._connectionQueueDataService.updateRefreshApproveQueue(true);

  }

  async refreshRejectQueue(object, remark_message) {

    this._connectionQueueService.approveQueue(object.id, this.user_data['username'], -1, remark_message);
    await this.delay(500);
    this.refresh();
    this._connectionQueueDataService.updateRefreshApproveQueue(true);

  }

  delay(milliseconds: number) {

    return new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });

  }

}

