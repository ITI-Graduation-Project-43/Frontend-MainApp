import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './Core/header/header.component';
import { CommonModule } from '@angular/common';
import { CourseModule } from './Course/course.module';
import { CourseComponent } from './Course/course.component';
import { AboutComponent } from './About/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'header', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'courseDetails', component: CourseComponent },
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
