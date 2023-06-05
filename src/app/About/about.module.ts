import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './Components/empty/empty.component';
import { Empty2Component } from './Components/empty2/empty2.component';



@NgModule({
  declarations: [
    EmptyComponent,
    Empty2Component
  ],
  imports: [
    CommonModule
  ]
})
export class AboutModule { }
