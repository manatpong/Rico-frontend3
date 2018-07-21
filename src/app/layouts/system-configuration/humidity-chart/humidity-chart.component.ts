import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-humidity-chart',
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.scss']
})
export class HumidityChartComponent implements OnInit {

  constructor() { }

  public lineChartType: string = 'line';
  public lineChartLegend: boolean = true;

  public lineChartData: Array<any> = [
    {
      data: [
        41, 40, 38, 42, 42, 39, 38, 40, 38, 38, 39, 39,
        40, 38, 42, 42, 38, 43, 39, 43, 40, 38, 38, 41,
        41, 40, 43, 41, 40, 38, 42, 41, 41, 41, 40, 39,
        43, 40, 43, 41, 43, 38, 41, 39, 39, 40, 41, 39],
      label: 'Humidity (Percent)', yAxisID: 'yAxis1'
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
            labelString: 'Humidity'
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
    { // Humidity
      backgroundColor: '#22c91738',
      borderColor: '#22c917',
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

  ngOnInit() {
  }

}
