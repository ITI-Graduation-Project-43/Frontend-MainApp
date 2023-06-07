import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInstructorComponent } from './home-instructor.component';
import { HeroSectionComponent } from './Components/hero-section/hero-section.component';
import { RequirementsComponent } from './Components/requirements/requirements.component';
import { RouterModule } from '@angular/router';
import { ProcessComponent } from './Components/process/process.component';
import { InstructorComponent } from './Components/instructor/instructor.component';
// import { AboutModule } from '../About/about.module';

@NgModule({
  declarations: [
    HomeInstructorComponent,
    HeroSectionComponent,
    RequirementsComponent,
    ProcessComponent,
    InstructorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeInstructorComponent }]),
    // AboutModule
  ],
})
export class HomeInstructorModule {}
