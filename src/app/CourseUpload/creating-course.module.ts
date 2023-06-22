import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CreatingCourseRoutingModule } from './creating-course-routing.module';
import { CreateCourseComponent } from './Components/create-course/create-course.component';
import { CreateChapterLessonComponent } from './Components/create-chapter-lesson/create-chapter-lesson.component';
import { QuizLessonComponent } from './Components/quiz-lesson/quiz-lesson.component';
import { VideoLessonComponent } from './Components/video-lesson/video-lesson.component';
import { ArticleLessonComponent } from './Components/article-lesson/article-lesson.component';

@NgModule({
  declarations: [
    CreateCourseComponent,
    CreateChapterLessonComponent,
    QuizLessonComponent,
    VideoLessonComponent,
    ArticleLessonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    CreatingCourseRoutingModule,
    ReactiveFormsModule,
  ],
})
export class CreatingCourseModule {}
