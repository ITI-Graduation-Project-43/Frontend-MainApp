import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { alphaNames, checkExpiryDate, onlyDigits } from '../../Helper/customValidations';
import { CheckoutService } from '../../Services/checkout.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit/*, OnChanges*/ {
  creditCardForm: string = '';
  showForm: boolean = false;
  @Output() FormData: EventEmitter<any> = new EventEmitter<any>();
  @Output() FormOpen: EventEmitter<any> = new EventEmitter<any>();

  constructor(public checkoutService:CheckoutService)  {
  }

  ngOnInit(): void {
    this.setCreditCardFormValidations();
    this.checkSavedCard();
    this.onFormValid()
  }

  setCreditCardFormValidations() {
    this.checkoutService.creditCardReactiveForm = this.checkoutService.fb.group({
      nameOnCard: ['', [Validators.required, alphaNames, Validators.minLength(3), Validators.maxLength(50)]],
      cardNumber: ['', [Validators.required, onlyDigits, Validators.minLength(16), Validators.maxLength(16)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/), checkExpiryDate]],
      cvc: ['', [Validators.required, onlyDigits, Validators.minLength(3), Validators.maxLength(3)]],
      saveCard: ['']
    })
  }

  checkSavedCard(){
    let savedCard = localStorage.getItem('creditCard');
    if(savedCard != null){
      let savedCardObj = JSON.parse(savedCard);

      this.checkoutService.creditCardReactiveForm.patchValue({
        nameOnCard : savedCardObj.nameOnCard,
        cardNumber : savedCardObj.cardNumber,
        expiryDate : savedCardObj.expiryDate,
        cvc : savedCardObj.cvc,
        saveCard: savedCardObj.saveCard
      })
    }
  }

  get nameOnCard() {
    return this.checkoutService.creditCardReactiveForm.get('nameOnCard');
  }
  get cardNumber() {
    return this.checkoutService.creditCardReactiveForm.get('cardNumber');
  }
  get expiryDate() {
    return this.checkoutService.creditCardReactiveForm.get('expiryDate');
  }
  get cvc() {
    return this.checkoutService.creditCardReactiveForm.get('cvc');
  }
  get saveCard() {
    return this.checkoutService.creditCardReactiveForm.get('saveCard');
  }

  showCreditCardForm() {
    switch (this.creditCardForm) {
      case "creditcard":
        this.showForm = true;
        break;

      case "paypal":
        this.showForm = false;
        break;
    }
    this.onOpenMethod();
  }

  onFormValid() {
    if(this.checkoutService.creditCardReactiveForm.valid) {
      this.FormData.emit(this.checkoutService.creditCardReactiveForm.value);
    }
  }

  onOpenMethod() {
    if(this.showForm) {
      this.FormOpen.emit(true);
    }
    else {
      this.FormOpen.emit(false);
    }
  }
}
