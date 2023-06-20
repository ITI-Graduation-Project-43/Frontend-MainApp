import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { CheckoutService } from '../../Services/checkout.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { APIService } from 'src/app/Shared/Services/api.service';
import { Payment } from 'src/app/Models/payment';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { SiteCoupon } from 'src/app/Models/siteCoupon';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor(public service: CheckoutService, private apiService: APIService, private notification: NotificationService) { }
  discount: number = 0;
  totalPrice!: number;
  code!: string;

  ngOnInit(): void {
    this.calcTotalPrice();
  }

  calcTotalPrice() {
    this.totalPrice = +((this.service.originalPrice - this.discount).toPrecision(5));
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
      coursesIds: this.service.orderCourses.map(crs => crs.id),
      siteCoupon: this.code,
      coursesCoupons: this.service.courseCoupons
    }
    return paymentObj;
  }


  performEnrollmentProcess() {
    this.service.orderCourses.forEach(crs => {
      this.apiService.addItem("Enrollment", {
        enrollmentDate: new Date(),
        courseId: crs.id,
        studentId: this.service.studentId
      }).subscribe((data) => {
        console.log(`Enroll to course ${crs.title}`)
      }, (error => {
        console.log(error);
        return;
      }))
    })
  }


  performPaymentProcess() {
    this.apiService.addItem("Payment", this.setPaymentObj()).subscribe((data) => {
      this.performEnrollmentProcess();
      this.resetCardForm();
      this.resetCart();
      this.resetSummaryForm();
      this.service.setOrderdItems();
      this.notification.notify("Successful Enrollment Process");
    }, (error) => {
      this.notification.notify("Payment Process has been failed, Please check your card details again");
      return;
    })
  }

  checkCoupon() {
    this.apiService.getItemById("SiteCoupon", this.code).subscribe((data: APIResponseVM) => {
      let coupon: SiteCoupon[] = data.items;
      this.discount = +(coupon[0].discount/100 * this.totalPrice).toPrecision(5);
      this.calcTotalPrice();
      this.notification.notify("Valid Coupon!");
    }, (error) => {
      this.notification.notify("Invalid Coupon!");
    })
  }

  saveCardDetails() {
    if (this.service.creditCardReactiveForm.value.saveCard) {
      localStorage.setItem('creditCard', JSON.stringify(this.service.creditCardReactiveForm.value));
    } else {
      localStorage.removeItem('creditCard');
    }
  }

  resetCardForm() {
    this.service.creditCardReactiveForm.reset();
  }

  resetCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  resetSummaryForm(){
    this.code = '';
    this.service.originalPrice = this.discount = this.totalPrice = 0.00;
  }

  completeCheckout() {
    this.saveCardDetails();
    this.performPaymentProcess();
  }
}
