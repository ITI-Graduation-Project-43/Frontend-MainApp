import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CountryComponent } from './Components/country/country.component';
import { PaymentMethodComponent } from './Components/payment-method/payment-method.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { SummaryComponent } from './Components/summary/summary.component';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { CourseCouponComponent } from './Components/course-coupon/course-coupon.component';
import { LoaderComponent } from './Components/loader/loader.component';




@NgModule({
  declarations: [
    CheckoutComponent,
    CountryComponent,
    PaymentMethodComponent,
    OrderDetailsComponent,
    SummaryComponent,
    CourseCouponComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule

  ]
})
export class CheckoutModule { }
