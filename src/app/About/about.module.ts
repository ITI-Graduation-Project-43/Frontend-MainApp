import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './Components/empty/empty.component';
import { MainSectionComponent } from './Components/main-section/main-section.component';

@NgModule({
  declarations: [EmptyComponent, MainSectionComponent],
  imports: [CommonModule],
  exports: [MainSectionComponent],
})
export class AboutModule {}
