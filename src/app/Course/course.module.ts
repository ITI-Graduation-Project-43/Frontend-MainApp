import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { EmptyComponent } from './Components/empty/empty.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CourseComponent, EmptyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CourseComponent }]),
  ],
})
export class CourseModule {}
