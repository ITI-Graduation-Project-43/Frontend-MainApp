import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CountryComponent } from './Components/country/country.component';
import { PaymentMethodComponent } from './Components/payment-method/payment-method.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { SummaryComponent } from './Components/summary/summary.component';
import { CheckoutComponent } from './checkout.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    CountryComponent,
    PaymentMethodComponent,
    OrderDetailsComponent,
    SummaryComponent, 
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
