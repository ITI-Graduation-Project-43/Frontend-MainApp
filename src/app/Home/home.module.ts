import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './Components/hero-section/hero-section.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CategorySectionComponent } from './Components/category-section/category-section.component';
import { TopRatedSectionComponent } from './Components/top-rated-section/top-rated-section.component';
import { TrustedSectionComponent } from './Components/trusted-section/trusted-section.component';
import { StatisticsSectionComponent } from './Components/statistics-section/statistics-section.component';
import { NewInSectionComponent } from './Components/new-in-section/new-in-section.component';
import { NumberPlusPipe } from '../Pipes/number-plus.pipe';
import { CourseCardComponent } from './Components/course-card/course-card.component';
import { TestimonialsSectionComponent } from './Components/testimonials-section/testimonials-section.component';
import { InstructorsSectionComponent } from './Components/instructors-section/instructors-section.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    CategorySectionComponent,
    TopRatedSectionComponent,
    TrustedSectionComponent,
    StatisticsSectionComponent,
    NewInSectionComponent,
    NumberPlusPipe,
    CourseCardComponent,
    TestimonialsSectionComponent,
    InstructorsSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    HomeRoutingModule
  ],
  exports: [StatisticsSectionComponent, CourseCardComponent]
})
export class HomeModule { }
