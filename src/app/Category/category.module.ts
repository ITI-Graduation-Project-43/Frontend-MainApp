import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { EmptyComponent } from './Components/empty/empty.component';



@NgModule({
  declarations: [
    CategoryComponent,
    EmptyComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class CategoryModule { }
