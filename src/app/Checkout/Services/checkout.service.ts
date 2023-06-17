import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/Models/course';
import { Payment } from 'src/app/Models/payment';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public fb:FormBuilder, private localStorageService:LocalStorageService) { }
  creditCardReactiveForm!: FormGroup;
  paymentObj!:Payment;
  originalPrice:number = 0;
  orderCourses: Course[] = [];


  credentials = this.localStorageService.decodeToken();
  studentId:string = this.credentials.Id;
  studentMail:string = this.credentials.Email;

}
