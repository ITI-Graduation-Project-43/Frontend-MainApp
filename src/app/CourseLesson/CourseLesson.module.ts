import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/SharedModule/SharedModule.module';
import { CourseLessonComponent } from './CourseLesson.component';
import { VideoPlayerComponent } from './video-player/video-player/video-player.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,

    RouterModule.forChild([{ path: '', component: CourseLessonComponent }]),
  ],
  declarations: [CourseLessonComponent, VideoPlayerComponent],
})
export class CourseLessonModule {}
