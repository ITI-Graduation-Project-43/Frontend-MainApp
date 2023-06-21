import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from './Components/course-card/course-card.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './Components/loader/loader.component';



@NgModule({
  declarations: [
    CategoryComponent,
    CourseCardComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class CategoryModule { }
