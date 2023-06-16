import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {path:'', component: CourseComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseRoutingModule { }
