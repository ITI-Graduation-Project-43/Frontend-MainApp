import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './Core/header/header.component';
import { CommonModule } from '@angular/common';
import { CourseModule } from './Course/course.module';
import { CourseComponent } from './Course/course.component';
import { AboutComponent } from './About/about.component';
import { CategoryComponent } from './Category/category.component';
import { HomeInstructorComponent } from './HomeInstructor/home-instructor.component';

const routes: Routes = [
  { path: '', redirectTo: 'header', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  {
    path: 'courseDetails',
    loadChildren: () =>
      import('../app/Course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'category/:id',
    loadChildren: () =>
      import('../app/Category/category.module').then((m) => m.CategoryModule)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../app/About/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'homeinstructor',
    loadChildren: () =>
      import('../app/HomeInstructor/home-instructor.module').then(
        (m) => m.HomeInstructorModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, CourseModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
