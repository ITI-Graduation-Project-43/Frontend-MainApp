import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCoursesRoutingModule } from './my-courses-routing.module';
import { MyCoursesComponent } from './my-courses.component';
import { CourseCardComponent } from './Components/course-card/course-card.component';
import { SharedModule } from '../Shared/SharedModule/SharedModule.module';



@NgModule({
  declarations: [
    MyCoursesComponent,
    CourseCardComponent,
  ],
  imports: [
    CommonModule,
    MyCoursesRoutingModule,
    SharedModule
  ]
})
export class MyCoursesModule { }
