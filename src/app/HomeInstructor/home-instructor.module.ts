import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInstructorComponent } from './home-instructor.component';
import { HeroSectionComponent } from './Components/hero-section/hero-section.component';
import { RequirementsComponent } from './Components/requirements/requirements.component';
import { ProcessComponent } from './Components/process/process.component';
import { InstructorComponent } from './Components/instructor/instructor.component';
import { MilestoneComponent } from './Components/milestone/milestone.component';
import { HomeInstructorRoutingModule } from './home-instructor-routing.module';
import { AboutModule } from '../About/about.module';

@NgModule({
  declarations: [
    HomeInstructorComponent,
    HeroSectionComponent,
    RequirementsComponent,
    ProcessComponent,
    InstructorComponent,
    MilestoneComponent,
  ],
  imports: [
    CommonModule,
    AboutModule,
    HomeInstructorRoutingModule
  ],
})
export class HomeInstructorModule {}
