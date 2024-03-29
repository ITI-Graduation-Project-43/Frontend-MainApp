import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { FormComponent } from './Components/form/form.component';
import { InfoComponent } from './Components/info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  declarations: [ContactComponent, FormComponent, InfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactRoutingModule,
  ],
})
export class ContactModule {}
