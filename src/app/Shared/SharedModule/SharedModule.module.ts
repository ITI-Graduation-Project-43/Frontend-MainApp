import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseContentComponent } from './course-content/course-content.component';
import { TruncatePipe } from './Pipes/truncate.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CourseContentComponent, TruncatePipe],
  exports: [CourseContentComponent, TruncatePipe],
})
export class SharedModule {}
