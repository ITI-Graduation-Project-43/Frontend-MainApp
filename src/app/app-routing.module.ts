import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/Home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'courseDetails/:id',
    loadChildren: () =>
      import('../app/Course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'category/:id',
    loadChildren: () =>
      import('../app/Category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'instructorDetails',
    loadChildren: () =>
      import('../app/instructor/instructor.module').then(
        (m) => m.InstructorModule
      )
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
      )
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../app/Contact/contact.module').then(
        (contact) => contact.ContactModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
