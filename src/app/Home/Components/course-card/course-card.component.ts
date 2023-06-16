import {Component, Input } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input()courses !: Course[];
  cart !: Course[];
  constructor(private shopCart : ShoppingCartService) {
  }

  rating(number: number): number[] {
    return Array(+number.toFixed());
  }

  AddToCart(course: Course) {
    this.shopCart.addItem(course);
  }
}
