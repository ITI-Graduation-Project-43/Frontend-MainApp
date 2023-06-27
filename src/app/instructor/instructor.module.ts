import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorCardComponent } from './Components/instructor-card/instructor-card.component';

@NgModule({
  declarations: [InstructorComponent, InstructorCardComponent],
  imports: [CommonModule, InstructorRoutingModule],
})
export class InstructorModule {}
