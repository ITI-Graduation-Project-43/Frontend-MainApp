import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../Core/core.module';
import { EmptyComponent } from './Components/empty/empty.component';
import { InstructorComponent } from './instructor.component';

@NgModule({
  declarations: [EmptyComponent, InstructorComponent],
  imports: [CommonModule, CoreModule],
})
export class InstructorModule {}
