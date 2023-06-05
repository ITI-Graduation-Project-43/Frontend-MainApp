import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { EmptyComponent } from './Components/empty/empty.component';
import { MainSectionComponent } from './Components/main-section/main-section.component';
import { VisionComponent } from './Components/vision/vision.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { GoalsComponent } from './Components/goals/goals.component';
import { TeamComponent } from './Components/team/team.component';

@NgModule({
  declarations: [AboutComponent, EmptyComponent, MainSectionComponent, VisionComponent, StatisticsComponent, GoalsComponent, TeamComponent],
  imports: [CommonModule],
  exports: [MainSectionComponent],
})
export class AboutModule {}
