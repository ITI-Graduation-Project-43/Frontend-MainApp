import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CheckoutService } from '../../Services/checkout.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  constructor(public service: CheckoutService) { }

  ngOnInit(): void {
    this.service.setOrderdItems();
    this.calcOriginalPrice();
  }

  calcOriginalPrice() {
    this.service.orderCourses.forEach(crs => {
      this.service.originalPrice += crs.price;
    })
    this.service.originalPrice = +(this.service.originalPrice.toPrecision(5));  
  }
}
