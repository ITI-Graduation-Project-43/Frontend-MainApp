import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCoursesRoutingModule } from './my-courses-routing.module';
import { MyCoursesComponent } from './my-courses.component';
import { CourseCardComponent } from './Components/course-card/course-card.component';
import { SharedModule } from '../Shared/SharedModule/SharedModule.module';
import { LoaderComponent } from './Components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './Pipes/truncate.pipe';



@NgModule({
  declarations: [
    MyCoursesComponent,
    CourseCardComponent,
    LoaderComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    MyCoursesRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class MyCoursesModule { }
