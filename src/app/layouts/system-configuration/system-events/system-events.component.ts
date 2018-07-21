import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-events',
  templateUrl: './system-events.component.html',
  styleUrls: ['./system-events.component.scss']
})
export class SystemEventsComponent implements OnInit {

  constructor() { }

  public barChartType: string = 'bar';
  public barChartLabels: string[] = ['May  2018', 'June 2018'];
  public barChartLegend: boolean = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartData: any[] = [
    { data: [65, 59], label: 'Connect' },
    { data: [28, 48], label: 'Disconnect' }
  ];
  public barChartColors: any[] = [{ backgroundColor: ['#3f51b5', '#3f51b5'] }, { backgroundColor: ['#f50057', '#f50057'] }];

  ngOnInit() {
  }

}
