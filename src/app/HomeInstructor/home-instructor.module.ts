import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInstructorComponent } from './home-instructor.component';
import { HeroSectionComponent } from './Components/hero-section/hero-section.component';
import { AboutModule } from '../About/about.module';


@NgModule({
  declarations: [
    HomeInstructorComponent,
    HeroSectionComponent,
  ],
  imports: [CommonModule,AboutModule],
})
export class HomeInstructorModule {}
