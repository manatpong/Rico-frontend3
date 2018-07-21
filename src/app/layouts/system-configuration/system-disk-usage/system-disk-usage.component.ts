import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-disk-usage',
  templateUrl: './system-disk-usage.component.html',
  styleUrls: ['./system-disk-usage.component.scss']
})
export class SystemDiskUsageComponent implements OnInit {

  constructor() { }

  public doughnutChartType: string = 'doughnut';
  public doughnutChartLabels: string[] = ['Disk Usage', 'Disk Free'];
  public doughnutChartData: number[] = [0.5, 3.5];
  public doughnutChartOptions = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const currentValue = dataset.data[tooltipItem.index];
          return currentValue + ' GB';
        }
      }
    }
  };
  public doughnutChartColors: any[] = [{ backgroundColor: ['#f50057', '#3f51b5'] }];

  ngOnInit() {
  }

}
