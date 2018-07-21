import { Component, OnInit } from '@angular/core';

// Service
import { PortConnectionDataService } from '../@shared/service/port_connection_data.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(
    private _portDataService: PortConnectionDataService) { }

  operation_data: object;

  ngOnInit() {

    this._portDataService.current_operation.subscribe(data => this.operation_data = data);

  }

}
