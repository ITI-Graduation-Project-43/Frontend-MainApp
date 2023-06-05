import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './Components/empty/empty.component';
import { MainSectionComponent } from './Components/main-section/main-section.component';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent, EmptyComponent, MainSectionComponent],
  imports: [CommonModule],
  exports: [MainSectionComponent],
})
export class AboutModule {}
