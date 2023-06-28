import { Component, OnInit} from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-recent-courses',
  templateUrl: './recent-courses.component.html',
  styleUrls: ['./recent-courses.component.scss']
})
export class RecentCoursesComponent implements OnInit {
  entryLevelCourses: Course[] = [];
  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getLatestCourses();
  }

  getLatestCourses() {
    this.categoryService.getLatestCourses().subscribe((data: Course[]) => {
      this.entryLevelCourses = data;
    })
  }

}
