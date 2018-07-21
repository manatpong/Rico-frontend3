import { Component, OnInit } from '@angular/core';

// Service
import { PortConnectionDataService } from '../@shared/service/port_connection_data.service';

@Component({
  selector: 'app-sequence-table',
  templateUrl: './sequence-table.component.html',
  styleUrls: ['./sequence-table.component.scss']
})
export class SequenceTableComponent implements OnInit {

  constructor(
    private _portDataService: PortConnectionDataService) { }

  sequence_data: object;

  ngOnInit() {

    this._portDataService.sequence_data.subscribe(data => this.sequence_data = data);

  }

  trackByFn(index, data) {

    return index;

  }

}
