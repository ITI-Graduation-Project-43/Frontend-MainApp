import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroSectionComponent } from './Components/hero-section/hero-section.component';
import { TrustedSectionComponent } from './Components/trusted-section/trusted-section.component';
import { CategorySectionComponent } from './Components/category-section/category-section.component';
import { TopRatedSectionComponent } from './Components/top-rated-section/top-rated-section.component';
import { CourseModule } from "../Course/course.module";



@NgModule({
    declarations: [
        HomeComponent,
        HeroSectionComponent,
        TrustedSectionComponent,
        CategorySectionComponent,
        TopRatedSectionComponent,
    ],
    imports: [
        CommonModule,
        CourseModule
    ]
})
export class HomeModule { }
