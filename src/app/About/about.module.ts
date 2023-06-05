import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { EmptyComponent } from './Components/empty/empty.component';



@NgModule({
  declarations: [
    EmptyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AboutModule {}
