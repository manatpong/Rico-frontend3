import { CountdownTimerComponent } from './../countdown-timer/countdown-timer.component';
import { DebuggingService } from './../../../@shared/service/debugging.service';
import { DebuggingClearDatabaseComponent } from './../../debugging/debugging-clear-database.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { AuthenticationService } from '../../../@shared/service/authentication.service';




@Component({
  selector: 'app-maintenance-appliance',
  templateUrl: './maintenance-appliance.component.html',
  styleUrls: ['./maintenance-appliance.component.scss']
})
export class MaintenanceApplianceComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _debuggingService: DebuggingService,
    private _authenticationService: AuthenticationService,
  ) { }

  user_data: string;

  ngOnInit() {
    this._authenticationService.current_user_data.subscribe(data => this.user_data = data);
  }


  openDialogClearDatabase(action) {

    const dialog = this._dialog.open(DebuggingClearDatabaseComponent);

    dialog.afterClosed()
      .subscribe(result => {
        if (result === 'confirm') {
          this.shutdownSystem(action);
        }
      });
  }

  shutdownSystem(action) {
    const datetime = new Date();
    const hours = datetime.getHours();
    const minute = datetime.getMinutes();
    const day = datetime.getUTCDate();
    const month = datetime.getUTCMonth() + 1;
    const year = datetime.getFullYear();
    const datetime_fix = year + '-' + month + '-' + day + ' ' + hours + ':' + minute;
    this._debuggingService.sendRestartSystem(this.user_data['username'], datetime_fix,action).then((data) => {
      console.log('Return',data)
      const return_msg = data;
      console.log(return_msg);
      if(return_msg['action'] === 'None') {
        alert(return_msg['status']);
      }
      else {
        const dialog = this._dialog.open(CountdownTimerComponent);
      }
    });
    const dialog = this._dialog.open(CountdownTimerComponent);
  }

}
