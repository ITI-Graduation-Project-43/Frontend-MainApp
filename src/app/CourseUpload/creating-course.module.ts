import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatingCourseRoutingModule } from './creating-course-routing.module';
import { CreateCourseComponent } from './Components/create-course/create-course.component';

@NgModule({
  declarations: [CreateCourseComponent],
  imports: [CommonModule, CreatingCourseRoutingModule, ReactiveFormsModule],
})
export class CreatingCourseModule {}
