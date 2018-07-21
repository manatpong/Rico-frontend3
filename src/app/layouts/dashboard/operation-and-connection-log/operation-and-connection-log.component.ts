import { Component, OnInit } from '@angular/core';

// Service
import { ConnectionHistoryService } from '../../../@shared/service/connection_history.service';
import { DashboardDataService } from '../@shared/services/dashboard_data.service';


@Component({
  selector: 'app-operation-and-connection-log',
  templateUrl: './operation-and-connection-log.component.html',
  styleUrls: ['./operation-and-connection-log.component.scss']
})
export class OperationAndConnectionLogComponent implements OnInit {

  constructor(
    private _connectionHistoryService: ConnectionHistoryService,
    private _dashboardDataService: DashboardDataService) { }

  operation_data: object;
  connection_history_data: object[] = [];

  ngOnInit() {

    this._dashboardDataService.current_operation.subscribe(data => this.operation_data = data);
    this.fetchConnectionHistory();

  }

  fetchConnectionHistory() {

    this._connectionHistoryService.getConnectionHistory().then((data) => {
      if (data['status'] !== 'error') {
        for (let i = 0; i < 20; i++) {
          this.connection_history_data.push({
            'timestamp': data[i]['timestamp'].toString().substring(0, 31),
            'east': data[i]['east'],
            'west': data[i]['west']
          });
        }
      }
    });

  }

  trackByFn(index, element) {

    return index;

  }

}
