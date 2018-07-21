import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snmp-v3-users',
  templateUrl: './snmp-v3-users.component.html',
  styleUrls: ['./snmp-v3-users.component.scss']
})
export class SnmpV3UsersComponent implements OnInit {

  constructor() { }

  icon_info: string;

  ngOnInit() {

    this.icon_info = 'Configure SNMP version 3 users for querying device status and receiving SNMP traps';

  }

}
