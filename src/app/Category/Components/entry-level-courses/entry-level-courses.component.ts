import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-entry-level-courses',
  templateUrl: './entry-level-courses.component.html',
  styleUrls: ['./entry-level-courses.component.scss']
})
export class EntryLevelCoursesComponent implements OnInit {
  entryLevelCourses:Course[] = [];
  constructor(public categoryService:CategoryService){}

  ngOnInit(): void {
    this.getEntryLevelCourses();
  }

  getEntryLevelCourses(){
    this.categoryService.getEntryLevelCourses().subscribe((data:Course[])=>{
      for (let i = 0; i < data.length; i++) {
        if(data[i].level === 0){
          this.entryLevelCourses.push(data[i]);
          if(this.entryLevelCourses.length == 3){
            break;
          }
        }
      }
    })
  }
}
