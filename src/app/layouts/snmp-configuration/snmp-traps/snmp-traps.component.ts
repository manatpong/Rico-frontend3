import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snmp-traps',
  templateUrl: './snmp-traps.component.html',
  styleUrls: ['./snmp-traps.component.scss']
})
export class SnmpTrapsComponent implements OnInit {

  constructor() { }

  icon_info: string;

  ngOnInit() {

    this.icon_info = 'Configure and enable/disable traps from the list. The enabled trap are sent to the trap receivers';

  }

}
