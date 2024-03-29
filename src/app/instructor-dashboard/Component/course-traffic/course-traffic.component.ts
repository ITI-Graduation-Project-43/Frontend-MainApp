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
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';
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
  templateUrl: 'course-traffic.component.html',
  styleUrls: ['course-traffic.component.scss'],
})
export class CourseTrafficComponent implements OnInit {
  instructorId: string;
  courseId!: number;
  status: string = 'Hours';
  hourlyCounts: number[] = [];
  dailyCounts: number[] = [];
  monthlyCounts: number[] = [];
  @Output() courseIdChanged = new EventEmitter<number>();
  instructorCourses: any;

  @ViewChild('chart') chart: ChartComponent | any;
  public chartOptions: ChartOptions;

  constructor(
    private instructorService: InstructorService,
    private timeTrackingService: TimeTrackingService,
    private localStorageService: LocalStorageService
  ) {
    this.instructorId = this.localStorageService.decodeToken().Id;

    this.chartOptions = {
      series: [
        {
          name: '',
          data: this.hourlyCounts,
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
        max: 55,
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
        if (this.instructorCourses.length > 0) {
          this.courseId = this.instructorCourses[0].id;
          this.courseIdChanged.emit(this.courseId);
          this.fetchData();
        }
      });
  }

  updateChartOptions(categories: string[], counts: number[]) {
    this.chartOptions.xaxis = {
      type: 'category',
      categories: categories,
    };
    this.chartOptions.series = [
      {
        name: '',
        data: counts,
      },
    ];
    this.chartOptions.yaxis = {
      min: 0,
      max: Math.max(...counts) * 1.1,
      title: {
        text: '',
      },
    };
  }

  fetchData() {
    this.timeTrackingService
      .GetCourseVisitCount(this.courseId)
      .subscribe((data: any) => {
        this.hourlyCounts = data[0].map(
          (obj: { hour: number; count: number }) => obj.count
        );
        this.dailyCounts = data[1].map(
          (obj: { day: string; count: number }) => obj.count
        );
        this.monthlyCounts = data[2].map(
          (obj: { month: number; count: number }) => obj.count
        );

        switch (this.status) {
          case 'Hours':
            this.updateChartOptions(
              [
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
              this.hourlyCounts
            );
            break;

          case 'Days':
            this.updateChartOptions(
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              this.dailyCounts
            );
            break;

          case 'Months':
            this.updateChartOptions(
              [
                'Jan',
                'Feb',
                'March',
                'April',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              this.monthlyCounts
            );
            break;

          default:
            break;
        }

        if (this.chart) {
          this.chart.updateOptions(this.chartOptions);
        }
      });
  }

  onStatusChange(event: any) {
    this.status = event.target.value;
    this.fetchData();
  }

  onCourseIdChange(event: any) {
    this.courseId = Number(event.target.value);
    this.courseIdChanged.emit(this.courseId);
    this.fetchData();
  }
}
