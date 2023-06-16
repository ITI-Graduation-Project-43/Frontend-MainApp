import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeInstructorComponent } from './home-instructor.component';

const routes:Routes = [
  {path:'', component: HomeInstructorComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeInstructorRoutingModule { }
