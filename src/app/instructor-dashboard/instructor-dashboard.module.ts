import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorDashboardRoutingModule } from './instructor-dashboard-routing.module';
import { InstructorDashboardComponent } from './instructor-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './Component/dashboard/dashboard.module';

@NgModule({
  declarations: [InstructorDashboardComponent],
  imports: [
    CommonModule,
    InstructorDashboardRoutingModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardModule
  ],
})
export class InstructorDashboardModule {}
