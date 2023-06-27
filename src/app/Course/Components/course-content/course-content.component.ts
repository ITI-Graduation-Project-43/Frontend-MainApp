import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Chapter } from 'src/app/Models/chapter';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  @Input() course: Course = {} as Course;
  @Input() chapters: Chapter[] = [];
  @Input() loading: boolean = true;

  isLoggedIn: boolean = true;
  constructor(
    private router: Router,
    private courseService: CourseService,
    private notification: NotificationService
  ) {}

  ngOnInit() {}

  toggleChapter(chapter: Chapter): void {
    chapter.open = !chapter.open;
  }

  getIconByType(type: string): string {
    switch (type) {
      case 'Video':
        return '../../assets/svg/lecture.svg';
      case 'Quiz':
        return '../../assets/svg/pen.svg';
      case 'Article':
        return '../../assets/svg/article.svg';
      default:
        return '';
    }
  }

  goToContentPage(lessonId: number): void {
    if (this.courseService.loggedIn && this.courseService.enrolledIn) {
      this.router.navigate([
        `/courses/${this.course.title}/${this.course.id}/lesson/${lessonId}`,
      ]);
    } else if (!this.courseService.loggedIn) {
      this.notification.notify('You have to sign in first');
      this.router.navigate(['/login']);
    } else {
      this.notification.notify(
        'You must enroll to course to view this content'
      );
    }
  }

  formatHours(hours: number): string {
    if (hours < 1) {
      const minutes = hours * 60;
      return minutes.toFixed(0) + ' Min(s)';
    } else {
      return hours.toFixed(1) + ' Hour(s)';
    }
  }
}
