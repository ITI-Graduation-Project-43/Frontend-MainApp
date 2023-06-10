import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';

@Component({
  selector: 'app-learn-card',
  templateUrl: './learn-card.component.html',
  styleUrls: ['./learn-card.component.scss'],
})
export class LearnCardComponent implements OnInit {
  @Input() course: Course = {} as Course;
  showMore = false;

  constructor() {}

  ngOnInit() {}

  getRows() {
    const result = [];
    for (let i = 0; i < this.course.learningItems?.length; i += 2) {
      result.push(this.course.learningItems.slice(i, i + 2));
    }
    return result;
  }

  hasMoreItems() {
    return this.course.learningItems?.length > 2;
  }
  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
