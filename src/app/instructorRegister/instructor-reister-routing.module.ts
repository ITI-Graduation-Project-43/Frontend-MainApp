import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareKnowledgeComponent } from './Components/share-knowledge/share-knowledge.component';
import { VideoAssessmentComponent } from './Components/video-assessment/video-assessment.component';
import { ExpandReachComponent } from './Components/expand-reach/expand-reach.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';

const routes: Routes = [
  { path: '', component: RegisterFormComponent },
  { path: 'shareknowledge', component: ShareKnowledgeComponent },
  {
    path: 'videoAssessment',
    component: VideoAssessmentComponent,
  },
  {
    path: 'expandReach',
    component: ExpandReachComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorReisterRoutingModule {}
