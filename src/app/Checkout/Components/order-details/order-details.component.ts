import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CheckoutService } from '../../Services/checkout.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{
  constructor(private service:CheckoutService){}
  ngOnInit(): void {
    this.setOrderdItems();
  }
  orderCourses: Course[] = [];
  setOrderdItems() {
    var cart = localStorage.getItem('cart');
    if (cart !== null)
      this.orderCourses = JSON.parse(cart);
      this.orderCourses.forEach(crs=>{
        crs.avgReview = Math.floor(crs.avgReview);
        this.service.originalPrice += crs.price;
      })
  }
}
