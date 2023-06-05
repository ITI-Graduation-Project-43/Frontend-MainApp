import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './Core/header/header.component';
import { CommonModule } from '@angular/common';
import { CourseModule } from './Course/course.module';
import { CourseComponent } from './Course/course.component';

const routes: Routes = [
  { path: '', redirectTo: 'header', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'courseDetails', component: CourseComponent },
];

@NgModule({
  imports: [CommonModule, CourseModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
