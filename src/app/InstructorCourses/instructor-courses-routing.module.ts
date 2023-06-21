import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorCoursesComponent } from './instructor-courses.component';
import { EditCourseComponent } from './Components/edit-course/edit-course.component';
import { CouresOverviewComponent } from './Components/coures-overview/coures-overview.component';

const routes: Routes = [
  { path: '', component: InstructorCoursesComponent },
  { path: 'courseOverview/:id', component: CouresOverviewComponent },
  { path: 'Edit/:id', component: EditCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorCoursesRoutingModule {}
