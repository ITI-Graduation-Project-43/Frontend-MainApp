import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseModule } from './Course/course.module';
import { CourseComponent } from './Course/course.component';
import { AboutComponent } from './About/about.component';
import { HomeComponent } from './Home/home.component';

const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('../app/Home/home.module').then(m => m.HomeModule),
    component: HomeComponent
  },

  {
    path: 'courseDetails',
    loadChildren: () => import('../app/Course/course.module').then(m => m.CourseModule),
    component: CourseComponent
  },
  {
    path: 'about',
    loadChildren: () => import('../app/About/about.module').then(m => m.AboutModule),
    component: AboutComponent,
  },
];

@NgModule({
  imports: [CommonModule, CourseModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
