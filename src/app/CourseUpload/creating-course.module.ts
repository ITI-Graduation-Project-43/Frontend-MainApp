import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CreatingCourseRoutingModule } from './creating-course-routing.module';
import { CreateCourseComponent } from './Components/create-course/create-course.component';
import { CreateChapterLessonComponent } from './Components/create-chapter-lesson/create-chapter-lesson.component';

@NgModule({
  declarations: [CreateCourseComponent, CreateChapterLessonComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    CreatingCourseRoutingModule,
    ReactiveFormsModule,
  ],
})
export class CreatingCourseModule {}
