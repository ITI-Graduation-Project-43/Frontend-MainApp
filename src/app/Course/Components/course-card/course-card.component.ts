import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { Student } from 'src/app/Models/student';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course = {} as Course;
  @Input() studentInCourse: Student[] = [];
  @Input() loading: boolean = true;

  constructor() {}

  ngOnInit() {}
}
