import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexGrid,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-course-traffic',
  templateUrl: './course-traffic.component.html',
  styleUrls: ['./course-traffic.component.scss'],
})
export class CourseTrafficComponent {
  @ViewChild('chart') chart: ChartComponent | any;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: [
            4, 3, 10, 9, 13, 10, 12, 9, 12, 7, 14, 5, 13, 9, 12, 2, 7, 5, 5, 7,
            8, 9, 8, 7,
          ],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: 2,
        curve: 'smooth',
        colors: ['#181818'],
      },
      xaxis: {
        type: 'category',
        categories: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
      },
      title: {
        text: '',
      },
      markers: {
        size: 0,
        colors: ['#181818'],
      },
      yaxis: {
        min: 0,
        max: 30,
        title: {
          text: '',
        },
      },
      grid: {
        show: false,
      },
    };
  }
}
