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
      name: "MindMission",
      email: this.service.studentMail,
      expirationMonth: this.service.creditCardReactiveForm.value.expireDate.split('/')[0],
      expirationYear: this.service.creditCardReactiveForm.value.expireDate.split('/')[1],
      nameOnCard: this.service.creditCardReactiveForm.value.nameOnCard,
      cardNumber: this.service.creditCardReactiveForm.value.cardNumber,
      cvc: this.service.creditCardReactiveForm.value.cvc,
      description: "successfull payment process",
      coursesIds: this.service.orderCourses.map(crs=>crs.id)
    }
    return paymentObj;
  }


  performEnrollmentProcess(){
    this.service.orderCourses.forEach(crs=>{
      this.apiService.addItem("Enrollment",{
        enrollmentDate: new Date(),
        courseId: crs.id,
        studentId: this.service.studentId
      }).subscribe((data)=>{
        console.log(`Enroll to course ${crs.title}`)
      },(error=>{
        console.log(error);
        return;
      }))
    })
  }


  performPaymentProcess(){
    this.apiService.addItem("Payment", this.setPaymentObj()).subscribe((data)=>{
      console.log(data);
      this.performEnrollmentProcess();
    },(error)=>{
      console.log(error);
      return;
    })
  }

  completeCheckout() {
    this.performPaymentProcess();
  }
}
