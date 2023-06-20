import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CourseTrafficComponent } from '../course-traffic/course-traffic.component';
import { OverviewComponent } from '../overview/overview.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, CourseTrafficComponent, OverviewComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    DashboardRoutingModule,
    FormsModule,
  ],
})
export class DashboardModule {}
