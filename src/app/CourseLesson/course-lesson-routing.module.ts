import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CourseLessonComponent } from './CourseLesson.component';
import { CourseFeedbackComponent } from './course-feedback/course-feedback.component';

const routes: Routes = [
  {
    path: '',
    component: CourseLessonComponent,
  },
  {
    path: 'courseFeedback',
    component: CourseFeedbackComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CourseLessonRoutingModule {}
