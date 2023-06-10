import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss'],
})
export class InstructorDetailsComponent implements OnInit {
  @Input() course: Course = {} as Course;
  constructor() {}

  ngOnInit() {}
}
