import { PortService } from './../../@shared/service/port.service';
import { ConnectionQueueService } from './../../@shared/service/connection_queue.service';
import { DebuggingDataService } from './@shared/services/debugging_data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// Component
import { DebuggingClearQueueComponent } from './debugging-clear-queue.component';
import { DebuggingClearDatabaseComponent } from './debugging-clear-database.component';
import { DebuggingSystemRestartComponent } from './debugging-system-restart.component';

// Service
import { AuthenticationService } from '../../@shared/service/authentication.service';
import { DebuggingService } from '../../@shared/service/debugging.service';
import { MenuDataService } from '../../@shared/service/menu_data.service';
import { PortConnectionService } from '../../@shared/service/port-connection.service';

// Third-party
import * as _ from 'lodash';

@Component({
  selector: 'app-debugging',
  templateUrl: './debugging.component.html',
  styleUrls: ['./debugging.component.scss'],
})
export class DebuggingComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _authenticationService: AuthenticationService,
    private _debuggingService: DebuggingService,
    private _menuDataService: MenuDataService,
    private _portConnectionService: PortConnectionService,

    private _debuggingDataService: DebuggingDataService,
    private _connectionQueueService: ConnectionQueueService,
    private _portService: PortService) {

    this._menuDataService.updateSelectedMenu('debugging');

  }

  user_data: string;
  action_condition: string = 'connect';
  robot_model: string;
  displayedColumns = [
    'day',
    'datetime',
    'enable'
  ];
  action_number_condition: number;
  random_rounds: number;
  random_condition_rounds: number;
  disconnect_probability: number = 50;
  connect_probability: number = 100 - this.disconnect_probability;
  active_clear_database: boolean = false;
  active_clear_queue: boolean = false;
  active_restart_system: boolean = false;
  normal_mode: boolean = false;
  simulate_mode: boolean = false;
  validate_connect_button: boolean = false;
  validate_disconnect_button: boolean = false;
  dataSource: any = new MatTableDataSource();

  btn_active: boolean = false;
  autoStatusActive: boolean;
  total_queue: number;
  timerInterval: any;
  auto_random_rounds: number;
  showError: boolean = false;

  ngOnInit() {

    this._debuggingDataService.total_queue.subscribe(data => this.total_queue = data);
    this._debuggingDataService.auto_active.subscribe(data => this.autoStatusActive = data);
    this._authenticationService.current_user_data.subscribe(data => this.user_data = data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchSystemRestartInfo();
    this.fetchRobotMode();
  }

  fetchSystemRestartInfo() {

    this._debuggingService.getSystemRestartInfo().then((data) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
    });

  }

  fetchConditionPercentage() {

    this.connect_probability = 100 - this.disconnect_probability;

  }

  fetchRobotMode() {

    this._debuggingService.getRobotMode().then((data) => {
      if (data['status'] === 'error') {
        this.robot_model = 'Unactive';
        this.normal_mode = false;
        this.simulate_mode = false;
      } else {
        this.robot_model = data['model'];
        if (data['mode'] === 'Normal') {
          this.normal_mode = true;
          this.simulate_mode = false;
        } else {
          this.normal_mode = false;
          this.simulate_mode = true;
        }
      }
    });

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

  changeRobotMode(mode: any) {

    this._debuggingService.changeRobotMode(mode).then((data) => {
      this._debuggingService.fetchRobotMode(data['mode']);
      if (data['mode'] === 'Normal') {
        this.normal_mode = true;
        this.simulate_mode = false;
      } else {
        this.normal_mode = false;
        this.simulate_mode = true;
      }
    });

  }

  openDialogClearDatabase() {

    const dialog = this._dialog.open(DebuggingClearDatabaseComponent);

    dialog.afterClosed()
      .subscribe(result => {
        if (result === 'confirm') {
          this.clearDatabase();
        }
      });

  }

  openDialogClearQueue() {

    const dialog = this._dialog.open(DebuggingClearQueueComponent);

    dialog.afterClosed()
      .subscribe(result => {
        if (result === 'confirm') {
          this.clearQueue();
        }
      });

  }

  openDialogSystemRestart(day: string) {

    const dialog = this._dialog.open(DebuggingSystemRestartComponent);
    dialog.afterClosed()
      .subscribe(result => {
        const array_result = result.split(',').map(Number);
        this._debuggingService.changeSystemRestartDatetime(day, array_result[0], array_result[1]).then(() => {
          this.fetchSystemRestartInfo();
        });
      });

  }

  restartSystem(action) {

    const datetime = new Date();
    const hours = datetime.getHours();
    const minute = datetime.getMinutes();
    const day = datetime.getUTCDate();
    const month = datetime.getUTCMonth() + 1;
    const year = datetime.getFullYear();
    const datetime_fix = year + '-' + month + '-' + day + ' ' + hours + ':' + minute;
    //this._debuggingService.sendRestartSystem(this.user_data['username'], datetime_fix);

  }

  clearDatabase() {

    this.active_clear_database = false;
    this._debuggingService.clearDatabase().then(() => {
      alert('Clear database complete');
    });

  }

  async clearQueue() {

    this.active_clear_queue = false;
    this._portConnectionService.clearOperation('clear');
    await this.delay(2000);
    this._portConnectionService.clearOperation('clear').then(() => {
      alert('Clear port queue complete');
    });

  }

  delay(milliseconds: number) {

    return new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });

  }

  unlockRandom() {

    return (this.random_rounds) ? false : true;

  }

  unlockRandomWithCondition() {

    return (this.random_condition_rounds) ? false : true;

  }

  async sendRandom(action: string) {

    const rounds = this.random_rounds;
    this.random_rounds = null;

    for (let i = 0; i < rounds; i++) {
      await this._debuggingService.sendRandom(action);
    }
    alert('Random complete');

  }

  async randomWithCondition() {

    for (let i = 0; i < this.random_condition_rounds; i++) {
      if (!this.action_number_condition) {
        this._debuggingService.randomWithCondition(this.action_condition, 0, this.disconnect_probability);
      } else {
        this._debuggingService.randomWithCondition(this.action_condition, this.action_number_condition, this.disconnect_probability);
      }
      await this.delay(100);
      if (i === this.random_condition_rounds - 1) {
        this.random_condition_rounds = null;
        this.action_number_condition = null;
        alert('Random complete');
      }
    }

  }


  ///////// auto random //////////
  async activeAutoRandom() {
    if(this.auto_random_rounds == 0 || this.auto_random_rounds == null) {
      this.showError = true;
    } else {
      this.showError = false;
      if (this.autoStatusActive) {
        this._debuggingDataService.getAutoRandom(false);
      } else {
        this._debuggingDataService.getAutoRandom(true);
      }
      this.autoRandom();
    }
  }

  async autoRandom() {

    
    while (this.autoStatusActive) {
      this._connectionQueueService.getAprroveQueue().then((data) => {
        this._debuggingDataService.fetchTotalQueue(_.size(data));
        if (this.total_queue > 0) {
          this._connectionQueueService.getAprroveQueue().then((data) => {
            this._debuggingDataService.fetchTotalQueue(_.size(data));
          });
          // console.log('total > 0', 'value', this.total_queue)
        } else {
          this._portService.getConnectedPort().then((data) => {

            const connected_port = _.size(data);
            this._portService.getUnavailablePort().then((port) => {
              const unavailable_port = _.size(port);
              const available_port = (144 - unavailable_port) - connected_port;
              const prob = Math.floor((connected_port / available_port) * 100);
              const random_number = Math.floor(Math.random() * 100);
              if (random_number > prob) {
                this._debuggingService.sendRandom('connect');
                this.auto_random_rounds = this.auto_random_rounds - 1;
                console.log('call connect with prob', prob, ' number', this.auto_random_rounds);
              } else {
                this._debuggingService.sendRandom('disconnect');
                this.auto_random_rounds = this.auto_random_rounds - 1;
                console.log('call disconnect with prob =', prob, ' number', this.auto_random_rounds);
              }

            });
          });


          console.log(this.total_queue);
        }

      });
      if (this.auto_random_rounds === 0) {
        this._debuggingDataService.getAutoRandom(false);
        break;
      }
      await this.delay(2000);
    }
    // this._debuggingDataService.getAutoRandom(false);
  }
  ////////////
}
