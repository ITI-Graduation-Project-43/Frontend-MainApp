import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorDashboardRoutingModule } from './instructor-dashboard-routing.module';
import { InstructorDashboardComponent } from './instructor-dashboard.component';
import { InstructorHeaderComponent } from './Component/instructor-header/instructor-header.component';
import { OverviewComponent } from './Component/overview/overview.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { CourseTrafficComponent } from './Component/course-traffic/course-traffic.component';

@NgModule({
  declarations: [
    InstructorDashboardComponent,
    InstructorHeaderComponent,
    OverviewComponent,
    DashboardComponent,
    CourseTrafficComponent,
  ],
  imports: [CommonModule, InstructorDashboardRoutingModule],
})
export class InstructorDashboardModule {}
