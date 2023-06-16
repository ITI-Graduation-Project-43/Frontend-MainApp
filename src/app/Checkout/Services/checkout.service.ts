import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/Models/payment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public fb:FormBuilder) { }
  creditCardReactiveForm!: FormGroup;
  paymentObj!:Payment;


  originalPrice:number = 0;
}
