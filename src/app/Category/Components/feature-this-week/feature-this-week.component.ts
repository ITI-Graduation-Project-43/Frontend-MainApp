import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-feature-this-week',
  templateUrl: './feature-this-week.component.html',
  styleUrls: ['./feature-this-week.component.scss'],
})
export class FeatureThisWeekComponent implements OnInit {
  featureThisWeekCourse!: Course | undefined;
  loadFeature: boolean = false;
  noCourses: boolean = false;

  constructor(public categoryService: CategoryService) {}
  ngOnInit(): void {
    this.getFeatureThisWeek();
  }
  getFeatureThisWeek() {
    this.loadFeature = true;
    this.categoryService.getFeatureThisWeek().subscribe(
      (data: Course[]) => {
        this.loadFeature = false;
        this.featureThisWeekCourse = data[0] as Course;
      },
      (error) => (this.noCourses = true)
    );
  }
}
