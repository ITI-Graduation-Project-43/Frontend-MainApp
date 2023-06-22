import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Chapter } from 'src/app/Models/chapter';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';

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
  constructor(private router: Router, private courseService:CourseService) {}

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
    } else if(!this.courseService.loggedIn){
      alert('You must be signed in to view this content');
      this.router.navigate(['/login']);
    }else{
      alert('You must enroll to course to view this content');
    }
  }
}
