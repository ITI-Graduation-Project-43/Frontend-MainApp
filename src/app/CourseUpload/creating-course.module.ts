import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuillModule } from 'ngx-quill';

import { CreatingCourseRoutingModule } from './creating-course-routing.module';
import { CreateCourseComponent } from './Components/create-course/create-course.component';
import { CreateChapterLessonComponent } from './Components/create-chapter-lesson/create-chapter-lesson.component';
import { QuizLessonComponent } from './Components/quiz-lesson/quiz-lesson.component';
import { VideoLessonComponent } from './Components/video-lesson/video-lesson.component';
import { ArticleLessonComponent } from './Components/article-lesson/article-lesson.component';
import { ChapterComponent } from './Components/chapter/chapter.component';
import { CreationDoneComponent } from './Components/creation-done/creation-done.component';

@NgModule({
  declarations: [
    CreateCourseComponent,
    CreateChapterLessonComponent,
    ChapterComponent,
    QuizLessonComponent,
    VideoLessonComponent,
    ArticleLessonComponent,
    CreationDoneComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatTooltipModule,
    CreatingCourseRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
})
export class CreatingCourseModule {}
