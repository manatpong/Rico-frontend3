import { Component, OnInit } from '@angular/core';

// Service
import { PortConnectionDataService } from '../@shared/service/port_connection_data.service';
import { PortConnectionService } from '../../../@shared/service/port-connection.service';

@Component({
  selector: 'app-error-reset',
  templateUrl: './error-reset.component.html',
  styleUrls: ['./error-reset.component.scss']
})
export class ErrorResetComponent implements OnInit {

  constructor(
    private _portDataService: PortConnectionDataService,
    private _portConnectionService: PortConnectionService) { }

  operation_data: object;

  ngOnInit() {

    this._portDataService.current_operation.subscribe(data => this.operation_data = data);

  }

  async errorReset(code) {

    if (code === 3) {
      this._portConnectionService.clearOperation('cancel');
      await this.delay(5000);
      this._portConnectionService.clearOperation('cancel');
    }
    this._portConnectionService.errorReset(code);

  }

  delay(milliseconds: number) {

    return new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });

  }

  showBtnDesc(btn: number) {
    if(btn === 1) {
      return 'Continue';
    }
    else if (btn === 2) {
      return 'Repeat';
    }
    else {
      return 'Cancel';
    }
  }

}
