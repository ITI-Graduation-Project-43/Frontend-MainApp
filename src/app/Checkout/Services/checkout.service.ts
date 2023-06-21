import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/Models/course';
import { CourseCoupon } from 'src/app/Models/courseCoupon';
import { Payment } from 'src/app/Models/payment';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public fb:FormBuilder, private localStorageService:LocalStorageService) { }
  creditCardReactiveForm!: FormGroup;
  paymentObj!:Payment;
  couponBtn:boolean = true;
  discount:number = 0;
  totalPrice:number = 0;
  originalPrice:number = 0;
  specificCard:number = 0;
  courseDiscount:number = 0;
  orderCourses: Course[] = [];
  courseCoupons:CourseCoupon[] = [];


  credentials = this.localStorageService.decodeToken();
  studentId:string = this.credentials?.Id;
  studentName:string = this.credentials?.FullName;
  studentMail:string = this.credentials?.Email;


  setOrderdItems() {
    var cart = localStorage.getItem('cart');
    if (cart !== null)
      this.orderCourses = JSON.parse(cart);
  }

  calcTotalPrice() {
    this.totalPrice = +((this.originalPrice - this.discount).toPrecision(5));
  }


}
