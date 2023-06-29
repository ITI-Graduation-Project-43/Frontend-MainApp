import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailsRoutingModule } from './student-details-routing.module';
import { StudentDetailsComponent } from './student-details.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { TruncatePipe } from './Pipes/truncate.pipe';

@NgModule({
  declarations: [StudentDetailsComponent, StudentCardComponent, TruncatePipe],
  imports: [CommonModule, StudentDetailsRoutingModule],
})
export class StudentDetailsModule {}
