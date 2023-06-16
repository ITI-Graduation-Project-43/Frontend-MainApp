import { Component, ViewChild } from '@angular/core';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { CheckoutService } from '../../Services/checkout.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { APIService } from 'src/app/Shared/Services/api.service';
import { SnackbarComponent } from 'src/app/Shared/snackbar/snackbar.component';
import { Payment } from 'src/app/Models/payment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  constructor(public service: CheckoutService, private apiService: APIService) { }

  setPaymentObj(){
    let paymentObj:Payment = {
      name: "Ahmed",
      email: "ouf902@gmail.com",
      expirationMonth: this.service.creditCardReactiveForm.value.expireDate.split('/')[0],
      expirationYear: this.service.creditCardReactiveForm.value.expireDate.split('/')[1],
      nameOnCard: this.service.creditCardReactiveForm.value.nameOnCard,
      cardNumber: this.service.creditCardReactiveForm.value.cardNumber,
      cvc: this.service.creditCardReactiveForm.value.cvc,
      description: "successfull payment process",
      coursesIds: [15, 16]
    }
    return paymentObj;
  }


  performPaymentProcess() {
    this.apiService.addItem("Payment", this.setPaymentObj()).subscribe((response: APIResponseVM) => {
      if(response.success){
        alert("success");
        console.log(response);
      }
    },(error)=>{
      alert("check card number");
    })
  }

  completeCheckout() {
    this.performPaymentProcess();
  }
}
