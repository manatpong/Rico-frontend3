import { Component, OnInit } from '@angular/core';

// Service
import { AuthenticationService } from '../../../@shared/service/authentication.service';
import { ConnectionQueueDataService } from '../@shared/services/connection_queue_data.service';
import { ConnectionQueueService } from '../../../@shared/service/connection_queue.service';

@Component({
  selector: 'app-queue-panel',
  templateUrl: './queue-panel.component.html',
  styleUrls: ['./queue-panel.component.scss']
})
export class QueuePanelComponent implements OnInit {

  constructor(
    private _authenticationService: AuthenticationService,
    private _connectionQueueDataService: ConnectionQueueDataService,
    private _connectionQueueService: ConnectionQueueService) { }

  current_action: string;
  current_user: string;
  datetime: string;
  current_selected_east: number;
  current_selected_west: number;
  min_date: object = new Date(Date.now());

  ngOnInit() {

    this._authenticationService.current_user_data.subscribe(data => { if (data) { this.current_user = data['username']; }});
    this._connectionQueueDataService.current_action_type.subscribe(data => this.current_action = data);
    this._connectionQueueDataService.current_selected_east.subscribe(data => this.current_selected_east = data);
    this._connectionQueueDataService.current_selected_west.subscribe(data => this.current_selected_west = data);

  }

  async addQueue() {

    const datetime = new Date(this.datetime);
    const hours = datetime.getHours();
    const minute = datetime.getMinutes();
    const day = datetime.getUTCDate();
    const month = datetime.getUTCMonth() + 1;
    const year = datetime.getFullYear();
    const datetime_fix = year + '-' + month + '-' + day + ' ' + hours + ':' + minute;
    this._connectionQueueService.addQueue(
      this.current_selected_east,
      this.current_selected_west,
      this.current_action,
      this.current_user,
      datetime_fix);
    this._connectionQueueDataService.changeSelectedEast(null);
    this._connectionQueueDataService.changeSelectedWest(null);
    this.datetime = null;
    this._connectionQueueDataService.updateRefreshQueue(true);

  }

  delay(milliseconds: number) {

    return new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });

  }

  validateButton() {

    return (this.current_selected_east && this.current_selected_west && this.datetime) ? false : true;

  }

}
