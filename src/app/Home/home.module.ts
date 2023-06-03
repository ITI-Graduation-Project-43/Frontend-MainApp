import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { EmptyComponent } from './Components/empty/empty.component';



@NgModule({
  declarations: [
    HomeComponent,
    EmptyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
