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
    this.setOrderdItems();
    this.calcOriginalPrice();
  }
  setOrderdItems() {
    var cart = localStorage.getItem('cart');
    if (cart !== null)
      this.service.orderCourses = JSON.parse(cart);
  }
  calcOriginalPrice() {
    this.service.orderCourses.forEach(crs => {
      this.service.originalPrice += crs.price;
    })
  }
}
