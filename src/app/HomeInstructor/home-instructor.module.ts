import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInstructorComponent } from './home-instructor.component';
import { HeroSectionComponent } from './Components/hero-section/hero-section.component';
import { GetStartedComponent } from '../About/Components/get-started/get-started.component';
import { AboutModule } from '../About/about.module';

@NgModule({
  declarations: [HomeInstructorComponent, HeroSectionComponent],
  imports: [CommonModule, AboutModule],
})
export class HomeInstructorModule {}
