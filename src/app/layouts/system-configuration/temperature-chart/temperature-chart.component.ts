import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.scss']
})
export class TemperatureChartComponent implements OnInit {

  constructor() { }

  public lineChartType: string = 'line';
  public lineChartLegend: boolean = true;

  public lineChartData: Array<any> = [
    {
      data: [
        37, 34, 37, 34, 34, 37, 36, 35, 33, 36, 34.06, 35.22,
        36.33, 34.78, 36.56, 36.97, 35.89, 34.91, 34.71, 35.25,
        36.57, 33.5, 34.66, 36.14, 35.28, 33.62, 36.57, 35.31,
        35.75, 33.11, 35.99, 33.5, 35.79, 33.93, 33.06, 33.9,
        35.15, 34.75, 34.99, 35.43, 36.08, 34.73, 33.96, 34.12,
        36.4, 35.14, 34.34, 34.71, 34.47, 33.31, 35.19, 34.95,
        34.75, 36.58, 33.84, 35.54, 36.9, 34.22, 36.47, 34.94,
        33.34, 35.9, 35.2, 33.0, 33.83, 35.83, 36.86, 34.02],
      label: 'Temperature (Celcius)', yAxisID: 'yAxis1'
    },
    {
      data: [
        70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
        70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
        70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
        70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
      ],
      label: 'UCL (Upper control limit)'
    },
    {
      data: [
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      ],
      label: 'LCL (Lower control limit)'
    },
  ];

  public lineChartLabels: Array<any> = [
    '1:14 AM', '2:56 AM', '3:23 AM', '4:29 AM',
    '5:29 AM', '6:06 AM', '7:44 AM', '8:48 AM',
    '9:53 AM', '10:36 AM', '11:35 AM', '12:07 AM',
    '13:26 PM', '14:49 PM', '15:17 PM', '16:58 PM',
    '17:42 PM', '18:58 PM', '19:55 PM', '20:36 PM',
    '21:37 PM', '22:13 PM', '23:49 PM', '00:56 PM'];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'yAxis1',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Temperature'
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          }
        },
      ],
      xAxes: [{
        gridLines: {
          drawOnChartArea: false
        }
      }]
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  public lineChartColors: Array<any> = [
    { // Temperature
      backgroundColor: '#3f51b524',
      borderColor: '#3f51b5',
    },
    { // UCL
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#d50000',

    },
    { // LCL
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#d50000',
    }
  ];

  public ipa: string = '//192.168.60.220:19999';
  public test_ip: any = '192.168.60.220:19999';
  ngOnInit() {
  }

}
