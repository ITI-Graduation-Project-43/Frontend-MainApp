import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { courseStudents } from 'src/app/Models/courseStudents';

@Component({
  selector: 'other-courses-card',
  templateUrl: './other-courses-card.component.html',
  styleUrls: ['./other-courses-card.component.scss'],
})
export class OtherCoursesCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() courses: courseStudents[] = [];
  @Input() coursesTotalCount: number = 0;
  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 2;
  @Output() loadMore = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  loadMoreCourses() {
    this.loadMore.emit();
  }
}
