import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { CheckoutService } from '../../Services/checkout.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { APIService } from 'src/app/Shared/Services/api.service';
import { SnackbarComponent } from 'src/app/Shared/snackbar/snackbar.component';
import { Payment } from 'src/app/Models/payment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor(public service: CheckoutService, private apiService: APIService) { }
  discount: number = 0;
  totalPrice!:string;
  
  ngOnInit(): void {
    this.totalPrice = (this.service.originalPrice + this.discount).toPrecision(5);
  }

  setPaymentObj() {
    let paymentObj: Payment = {
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

  performEnrollmentProcess(){
    forkJoin({
      payment: this.apiService.addItem("Payment", this.setPaymentObj()),
      enrollment: this.apiService.addItem("Enrollment",{
        enrollmentDate: "2023-06-16T16:13:06.945Z",
        courseId: 11,
        studentId: "550db4e5-928d-49f9-8b2e-b3c3853e9b40"
      })
    }).subscribe((data)=>{
      alert("successss");
      console.log(data.enrollment)
      console.log(data.payment)
    },(error)=>{
      alert(error);
    })
  }


  completeCheckout() {
    this.performEnrollmentProcess();
  }
}
