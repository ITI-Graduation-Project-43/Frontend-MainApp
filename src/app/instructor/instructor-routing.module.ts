import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {path:'', component: InstructorComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InstructorRoutingModule { }
