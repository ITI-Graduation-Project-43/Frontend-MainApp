import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { EmptyComponent } from './Components/empty/empty.component';
import { MainSectionComponent } from './Components/main-section/main-section.component';
import { VisionComponent } from './Components/vision/vision.component';

@NgModule({
  declarations: [AboutComponent, EmptyComponent, MainSectionComponent, VisionComponent],
  imports: [CommonModule],
  exports: [MainSectionComponent],
})
export class AboutModule {}
