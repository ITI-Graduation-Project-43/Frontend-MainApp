import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alphaNames, onlyDigits } from '../../Helper/customValidations';
import { CheckoutService } from '../../Services/checkout.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  constructor(public checkoutService:CheckoutService) { }
  creditCardForm: string = '';
  showForm: boolean = false;


  ngOnInit(): void {
    this.setCreditCardFormValidations();
  }

  setCreditCardFormValidations() {
    this.checkoutService.creditCardReactiveForm = this.checkoutService.fb.group({
      nameOnCard: ['', [Validators.required, alphaNames, Validators.minLength(3), Validators.maxLength(50)]],
      cardNumber: ['', [Validators.required, onlyDigits, Validators.minLength(16), Validators.maxLength(16)]],
      expireDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(2[2-9]|[3-6][0-9]|7[0])$/)]],
      cvc: ['', [Validators.required, onlyDigits, Validators.minLength(3), Validators.maxLength(3)]],
    })
  }

  get nameOnCard() {
    return this.checkoutService.creditCardReactiveForm.get('nameOnCard');
  }
  get cardNumber() {
    return this.checkoutService.creditCardReactiveForm.get('cardNumber');
  }
  get expireDate() {
    return this.checkoutService.creditCardReactiveForm.get('expireDate');
  }
  get cvc() {
    return this.checkoutService.creditCardReactiveForm.get('cvc');
  }



  showCreditCardForm() {
    switch (this.creditCardForm) {
      case 'creditcard':
        this.showForm = true;
        break;

      case 'paypal':
        this.showForm = false;
        break;
    }
  }
}
