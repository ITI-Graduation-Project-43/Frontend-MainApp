import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
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
import { InstructorService } from 'src/app/Services/instructor.service';
import { TimeTrackingService } from 'src/app/Services/time-tracking.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

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
export class CourseTrafficComponent implements OnInit {
  instructorId: string = '4ae72bce-ddd7-45da-ac42-780deb784c9d';
  courseId!: number;
  countArray: number[] = new Array(24).fill(0);
  @Output() courseIdChanged = new EventEmitter<number>();
  hourCount: any[] = [];
  instructorCourses: any[] = [];

  @ViewChild('chart') chart: ChartComponent | any;
  public chartOptions: ChartOptions;

  constructor(
    private instructorService: InstructorService,
    private timeTrackingService: TimeTrackingService
  ) {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: this.countArray,
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
  ngOnInit() {
    this.instructorService
      .getAllCourses(this.instructorId)
      .subscribe((data: APIResponseVM) => {
        this.instructorCourses = data.items;
      });
  }

  onCourseIdChange(event: any) {
    this.countArray = new Array(24).fill(0);
    this.courseId = Number(event.target.value);
    this.courseIdChanged.emit(this.courseId);
    this.timeTrackingService
      .GetCourseVisitCount(this.courseId)
      .subscribe((data: any) => {
        data.forEach((item: { hour: number; count: number }) => {
          const hour: number = item.hour;
          const count: number = item.count;
          this.countArray[hour] = count;
        });
        this.chartOptions.series = [
          {
            name: '',
            data: this.countArray,
          },
        ];

        this.chart.updateOptions(this.chartOptions);
      });
  }
}
