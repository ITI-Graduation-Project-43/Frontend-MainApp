import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { RouterModule } from '@angular/router';
import { OtherCoursesCardComponent } from './Components/other-courses-card/other-courses-card.component';
import { CourseTitleComponent } from './Components/course-title/course-title.component';
import { BreadcrumbNavigationComponent } from './Components/breadcrumb-navigation/breadcrumb-navigation.component';
import { CourseCardComponent } from './Components/course-card/course-card.component';
import { LearnCardComponent } from './Components/learn-card/learn-card.component';
import { ExcerciseCardComponent } from './Components/excercise-card/excercise-card.component';
import { CourseContentComponent } from './Components/course-content/course-content.component';
import { EnrollCardComponent } from './Components/enroll-card/enroll-card.component';
import { RequirementsCardComponent } from './Components/requirements-card/requirements-card.component';
import { InstructorDetailsComponent } from './Components/instructor-details/instructor-details.component';
import { StudentFeedbackComponent } from './Components/student-feedback/student-feedback.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseTitleComponent,
    BreadcrumbNavigationComponent,
    CourseCardComponent,
    LearnCardComponent,
    ExcerciseCardComponent,
    CourseContentComponent,
    EnrollCardComponent,
    RequirementsCardComponent,
    InstructorDetailsComponent,
    OtherCoursesCardComponent,
    StudentFeedbackComponent,
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    RouterModule.forChild([{ path: '', component: CourseComponent }]),
  ],
  exports: [OtherCoursesCardComponent],
})
export class CourseModule {}
