import { Component } from '@angular/core';
import { TimeTrackingService } from '../Services/time-tracking.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss'],
})
export class InstructorDashboardComponent {
  recentStudents: any;
  constructor(private timeTrackingService: TimeTrackingService) {
    document.querySelector('.app-header')?.classList.add('dark-background');
  }

  onCourseIdChanged(courseId: number) {
    this.timeTrackingService.recentStudent(courseId).subscribe((data: any) => {
      this.recentStudents = data;
    });
  }
}
