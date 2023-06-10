import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { EmptyComponent } from './Components/empty/empty.component';
import { CoreModule } from '../Core/core.module';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoryComponent,
    EmptyComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    CategoryRoutingModule,
    FormsModule
  ]
})
export class CategoryModule { }
