import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './Components/create-course/create-course.component';
import { CreateChapterLessonComponent } from './Components/create-chapter-lesson/create-chapter-lesson.component';
import { CreationDoneComponent } from './Components/creation-done/creation-done.component';

const routes: Routes = [
  { path: '', component: CreateCourseComponent },
  { path: 'step2', component: CreateChapterLessonComponent },
  { path: 'done',component:CreationDoneComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatingCourseRoutingModule {}
