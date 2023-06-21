import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeInstructorComponent } from './HomeInstructor/home-instructor.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/Home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'courseDetails/:id',
    loadChildren: () =>
      import('../app/Course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'courses/:courseName/:courseId/lesson/:lessonId',
    loadChildren: () =>
      import('./CourseLesson/CourseLesson.module').then(
        (m) => m.CourseLessonModule
      ),
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
  },
  {
    path: 'studentDetails',
    loadChildren: () =>
      import('../app/student-details/student-details.module').then(
        (m) => m.StudentDetailsModule
      ),
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
      import('../app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../app/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('../app/Checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'mycourses',
    loadChildren: () =>
      import('../app/MyCourses/my-courses.module').then(
        (m) => m.MyCoursesModule
      ),
  },
  {
    path: 'instructor',
    loadChildren: () =>
      import('../app/instructor-dashboard/instructor-dashboard.module').then(
        (m) => m.InstructorDashboardModule
      ),
  },
  {
    path: 'instructorRegister',
    loadChildren: () =>
      import('../app/instructorRegister/instructor-reister.module').then(
        (m) => m.InstructorReisterModule
      ),
  },
  {
    path: 'createCourse',
    loadChildren: () =>
      import('../app/CourseUpload/creating-course.module').then(
        (m) => m.CreatingCourseModule
      ),
  },

  {
    path: 'instructorCourses',
    loadChildren: () =>
      import('../app/InstructorCourses/instructor-courses.module').then(
        (m) => m.InstructorCoursesModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
