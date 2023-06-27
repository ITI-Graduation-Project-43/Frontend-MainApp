import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  saving: boolean = false;
  stripForm !: any;
  show : boolean = false;

  constructor() {
  }

  get firstName() {
    return this.stripForm.get('firstName')
  }

  getCreditFormInformation(e: any) {
    this.stripForm = e;
    console.log(e);
  }

  activate(e: any) {
    this.show = e;
  }

  SavPaymentInformation() {
    if(this.stripForm) {
      localStorage.setItem("creditCard", JSON.stringify(this.stripForm))
    }
  }
}
