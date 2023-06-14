import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alphaNames, onlyDigits } from '../../Helper/customValidations';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  creditCardForm: string = '';
  showForm: boolean = false;
  creditCardReactiveForm!: FormGroup;


  ngOnInit(): void {
    this.setCreditCardFormValidations();
  }

  setCreditCardFormValidations() {
    this.creditCardReactiveForm = this.fb.group({
      nameOnCard: ['', [Validators.required, alphaNames, Validators.minLength(3), Validators.maxLength(50)]],
      cardNumber: ['', [Validators.required, onlyDigits, Validators.minLength(16), Validators.maxLength(16)]],
      expireDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])$/)]],
      cvc: ['', [Validators.required, onlyDigits, Validators.minLength(3), Validators.maxLength(3)]],
    })
  }

  get nameOnCard() {
    return this.creditCardReactiveForm.get('nameOnCard');
  }
  get cardNumber() {
    return this.creditCardReactiveForm.get('cardNumber');
  }
  get expireDate() {
    return this.creditCardReactiveForm.get('expireDate');
  }
  get cvc() {
    return this.creditCardReactiveForm.get('cvc');
  }


  pay(){
    console.log(this.creditCardReactiveForm.value)
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
