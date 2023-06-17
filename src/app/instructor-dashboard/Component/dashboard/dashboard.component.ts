import { Component } from '@angular/core';
import { TimeTrackingService } from 'src/app/Services/time-tracking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  recentStudents: any[] = [];
  constructor(private timeTrackingService: TimeTrackingService) {}

  onCourseIdChanged(courseId: number) {
    this.timeTrackingService.recentStudent(courseId).subscribe((data: any) => {
      this.recentStudents = data;
    });
  }
}
