import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/SharedModule/SharedModule.module';
import { CourseLessonComponent } from './CourseLesson.component';
import { CourseLessonRoutingModule } from './course-lesson-routing.module';
import { CourseFeedbackComponent } from './course-feedback/course-feedback.component';
import { CourseDiscussionComponent } from './course-discussion/course-discussion.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CourseLessonRoutingModule,
  ],
  declarations: [
    CourseLessonComponent,
    CourseDiscussionComponent,
    CourseFeedbackComponent,
  ],
})
export class CourseLessonModule {}
