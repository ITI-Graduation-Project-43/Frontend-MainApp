import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/Models/chapter';
import { Course } from 'src/app/Models/course';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  @Input() course: Course = {} as Course;
  @Input() chapters: Chapter[] = [];
  @Input() loading: boolean = true;

  constructor() {}

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
}
