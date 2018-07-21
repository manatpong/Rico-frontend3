import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-cpu-usage',
  templateUrl: './system-cpu-usage.component.html',
  styleUrls: ['./system-cpu-usage.component.scss']
})
export class SystemCpuUsageComponent implements OnInit {

  constructor() { }

  public doughnutChartType: string = 'doughnut';
  public doughnutChartLabels: string[] = ['CPU Usage', 'CPU Free'];
  public doughnutChartData: number[] = [6, 94];
  public doughnutChartOptions = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const currentValue = dataset.data[tooltipItem.index];
          return currentValue + '%';
        }
      }
    }
  };
  public doughnutChartColors: any[] = [{ backgroundColor: ['#f50057', '#3f51b5' ] }];

  ngOnInit() {
  }

}
