import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './Components/loader/loader.component';
import { BreadcrumbNavigationComponent } from './Components/breadcrumb-navigation/breadcrumb-navigation.component';
import { FeatureThisWeekComponent } from './Components/feature-this-week/feature-this-week.component';
import { EntryLevelCoursesComponent } from './Components/entry-level-courses/entry-level-courses.component';
import { TopInstructorsComponent } from './Components/top-instructors/top-instructors.component';
import { RecentCoursesComponent } from './Components/recent-courses/recent-courses.component';
import { FilterCoursesComponent } from './Components/filter-courses/filter-courses.component';
import { CategoryTitleComponent } from './Components/category-title/category-title.component';
import { HomeModule } from '../Home/home.module';

@NgModule({
  declarations: [
    CategoryComponent,
    LoaderComponent,
    BreadcrumbNavigationComponent,
    FeatureThisWeekComponent,
    EntryLevelCoursesComponent,
    TopInstructorsComponent,
    RecentCoursesComponent,
    FilterCoursesComponent,
    CategoryTitleComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    RouterModule,
    HomeModule,
  ],
})
export class CategoryModule {}
