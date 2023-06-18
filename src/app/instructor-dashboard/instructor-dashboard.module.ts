import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorDashboardRoutingModule } from './instructor-dashboard-routing.module';
import { InstructorDashboardComponent } from './instructor-dashboard.component';
import { InstructorHeaderComponent } from './Component/instructor-header/instructor-header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './Component/dashboard/dashboard.module';

@NgModule({
  declarations: [InstructorDashboardComponent, InstructorHeaderComponent],
  imports: [
    CommonModule,
    InstructorDashboardRoutingModule,
    DashboardModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class InstructorDashboardModule {}
