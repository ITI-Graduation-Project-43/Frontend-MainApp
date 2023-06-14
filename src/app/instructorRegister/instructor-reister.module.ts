import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorReisterRoutingModule } from './instructor-reister-routing.module';
import { ShareKnowledgeComponent } from './Components/share-knowledge/share-knowledge.component';
import { VideoAssessmentComponent } from './Components/video-assessment/video-assessment.component';
import { ExpandReachComponent } from './Components/expand-reach/expand-reach.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShareKnowledgeComponent,
    VideoAssessmentComponent,
    ExpandReachComponent,
  ],
  imports: [CommonModule, InstructorReisterRoutingModule, ReactiveFormsModule],
})
export class InstructorReisterModule {}
