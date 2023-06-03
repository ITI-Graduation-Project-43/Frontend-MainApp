import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { EmptyComponent } from './Components/empty/empty.component';



@NgModule({
  declarations: [
    CourseComponent,
    EmptyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CourseModule { }
