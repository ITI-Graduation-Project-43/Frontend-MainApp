import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckoutService } from '../../Services/checkout.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { APIService } from 'src/app/Shared/Services/api.service';
import { Payment } from 'src/app/Models/payment';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { SiteCoupon } from 'src/app/Models/siteCoupon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor(public service: CheckoutService,
    private apiService: APIService,
    private notification: NotificationService,
    private navigator: Router) { }
  code!: string;
  siteCouponDisable: boolean = false;

  ngOnInit(): void {
    this.service.calcTotalPrice();
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
    console.log(paymentObj);
    return paymentObj;
  }


  performEnrollmentProcess() {
    this.service.orderCourses.forEach(crs => {
      this.apiService.addItem("Enrollment", {
        enrollmentDate: new Date(),
        courseId: crs.id,
        studentId: this.service.studentId
      }).subscribe((data) => {
        console.log(`Enroll to course ${crs.title}`);
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
      this.service.discount += +(coupon[0].discount / 100 * this.service.totalPrice).toPrecision(5);
      this.service.calcTotalPrice();
      this.notification.notify("Valid Coupon!");
      this.siteCouponDisable = true;
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

  resetSummaryForm() {
    this.code = '';
    this.service.originalPrice = this.service.discount = this.service.totalPrice = 0.00;
  }

  completeCheckout() {
    this.saveCardDetails();
    this.performPaymentProcess();
  }
}
