import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { CheckoutService } from '../../Services/checkout.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { APIService } from 'src/app/Shared/Services/api.service';
import { Payment } from 'src/app/Models/payment';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor(public service: CheckoutService, private apiService: APIService, private notification:NotificationService) { }
  discount: number = 0;
  totalPrice!:number;
  code!:string;
  
  ngOnInit(): void {
    this.totalPrice = +((this.service.originalPrice + this.discount).toPrecision(5));
  }

  setPaymentObj() {
    let paymentObj: Payment = {
      name: this.service.studentName,
      email: this.service.studentMail,
      expirationMonth: this.service.creditCardReactiveForm.value.expiryDate.split('/')[0],
      expirationYear: this.service.creditCardReactiveForm.value.expiryDate.split('/')[1],
      nameOnCard: this.service.creditCardReactiveForm.value.nameOnCard,
      cardNumber: this.service.creditCardReactiveForm.value.cardNumber,
      cvc: this.service.creditCardReactiveForm.value.cvc,
      description: "successfull payment process",
      coursesIds: this.service.orderCourses.map(crs=>crs.id),
      coupon: this.code
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
      this.resetCardForm();
      this.resetCart();
      this.notification.notify("Successful Enrollment Process");
      location.reload();
    },(error)=>{
      this.notification.notify("Payment Process has been failed, Please check your card details again");
      console.log(error);
      return;
    })
  }

  checkCoupon(){
    this.apiService.getItemById("Coupon",this.code).subscribe((data:APIResponseVM)=>{
      let coupon : any[] = data.items;
      this.service.orderCourses.forEach(crs=>{
        if(crs.id == coupon[0].courseId){
          this.notification.notify("Valid Coupon!");
          this.discount = +((crs.price * (coupon[0].discount/100)).toFixed(5));
          this.totalPrice -= this.discount;
        }
      })
    },(error)=>{
      console.log(error)
    })
  }

  saveCardDetails(){
    if(this.service.creditCardReactiveForm.value.saveCard){
      localStorage.setItem('creditCard',JSON.stringify(this.service.creditCardReactiveForm.value));
    }else{
      localStorage.removeItem('creditCard');
    }
  }

  resetCardForm(){
    this.service.creditCardReactiveForm.reset();
  }

  resetCart(){
    localStorage.setItem('cart',JSON.stringify([]));
  }

  completeCheckout() {
    this.saveCardDetails();
    this.performPaymentProcess();
  }
}
