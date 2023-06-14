import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseContentComponent } from './course-content/course-content.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CourseContentComponent],
  exports: [CourseContentComponent],
})
export class SharedModule {}
