import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorCoursesRoutingModule } from './instructor-courses-routing.module';
import { InstructorCoursesComponent } from './instructor-courses.component';
import { CourseCardComponent } from './Components/course-card/course-card.component';
import { CouresOverviewComponent } from './Components/coures-overview/coures-overview.component';
import { EditCourseComponent } from './Components/edit-course/edit-course.component';


@NgModule({
  declarations: [
    InstructorCoursesComponent,
    CourseCardComponent,
    CouresOverviewComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    InstructorCoursesRoutingModule
  ]
})
export class InstructorCoursesModule { }
