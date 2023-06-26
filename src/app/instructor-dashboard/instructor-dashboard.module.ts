import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorDashboardRoutingModule } from './instructor-dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructorDashboardComponent } from './instructor-dashboard.component';
import { OverviewComponent } from './Component/overview/overview.component';
import { CourseTrafficComponent } from './Component/course-traffic/course-traffic.component';

@NgModule({
  declarations: [
    InstructorDashboardComponent,
    OverviewComponent,
    CourseTrafficComponent
  ],
  imports: [
    CommonModule,
    InstructorDashboardRoutingModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InstructorDashboardModule {}
