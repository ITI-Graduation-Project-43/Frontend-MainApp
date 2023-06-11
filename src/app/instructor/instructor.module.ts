import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './Components/empty/empty.component';
import { InstructorComponent } from './instructor.component';

@NgModule({
  declarations: [EmptyComponent, InstructorComponent],
  imports: [CommonModule],
})
export class InstructorModule {}
