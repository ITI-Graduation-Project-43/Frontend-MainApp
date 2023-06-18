import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorDashboardComponent } from './instructor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InstructorDashboardComponent,
  },
  {
    path: 'Dashboard',
    loadChildren: () =>
      import('./Component/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorDashboardRoutingModule {}
