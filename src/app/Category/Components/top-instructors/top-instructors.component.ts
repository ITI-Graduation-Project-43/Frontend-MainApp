import { Component, OnInit } from '@angular/core';
import { Instructor } from 'src/app/Models/instructor';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-top-instructors',
  templateUrl: './top-instructors.component.html',
  styleUrls: ['./top-instructors.component.scss']
})
export class TopInstructorsComponent implements OnInit {
  topInstructorOne!: Instructor | undefined;
  topInstructorTwo!: Instructor | undefined;
  topInstructorThree!: Instructor | undefined;
  topInstructorFour!: Instructor | undefined;

  constructor(public categoryService:CategoryService){}
  ngOnInit(): void {
    this.categoryService.getTopInstructors().subscribe((data:Instructor[])=>{
        this.topInstructorOne = data[0] as Instructor;
        this.topInstructorTwo = data[1] as Instructor;
        this.topInstructorThree = data[2] as Instructor;
        this.topInstructorFour = data[3] as Instructor;
    });
  }
}
