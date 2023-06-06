import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBlackBgComponent } from './header/blackBackground/header-black-bg/header-black-bg.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderBlackBgComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderBlackBgComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
