import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snmp-traps-receivers',
  templateUrl: './snmp-traps-receivers.component.html',
  styleUrls: ['./snmp-traps-receivers.component.scss']
})
export class SnmpTrapsReceiversComponent implements OnInit {

  constructor() { }

  icon_info: string;

  ngOnInit() {

    this.icon_info = 'Configure destinations to receive traps sent by the SNMP agent';

  }

}
