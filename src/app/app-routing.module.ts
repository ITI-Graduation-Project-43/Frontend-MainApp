import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseModule } from './Course/course.module';
import { CategoryComponent } from './Category/category.component';
import { HomeInstructorComponent } from './HomeInstructor/home-instructor.component';
import { InstructorComponent } from './instructor/instructor.component';
import { HomeComponent } from './Home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/Home/home.module').then((m) => m.HomeModule),
    component: HomeComponent,
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
      ),
    component: InstructorComponent,
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
    component: HomeInstructorComponent,
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../app/Contact/contact.module').then(
        (contact) => contact.ContactModule
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('../app/Checkout/checkout.module').then((m) => m.CheckoutModule),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
