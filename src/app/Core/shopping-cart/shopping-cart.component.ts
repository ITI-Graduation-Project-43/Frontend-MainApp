import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../Services/cart.service';
import { Course } from 'src/app/Models/course';
import { Observable, merge, of } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})

export class ShoppingCartComponent implements OnInit {
  cartItems: Observable<Course[]>;
  totalPrice: number;
  totalCourses: number;

  constructor(private cartService: ShoppingCartService) {
    this.cartItems = of(this.cartService.getItems());
    this.totalCourses = this.cartService.getItems().length;
    this.totalPrice = cartService.calculateTotal();
  }

  ngOnInit() {
    let obvserver = {
      next: (newCourse: Course) => {
        if(newCourse) {
          this.cartItems.subscribe(data => {
            data.push(newCourse); // real-time adding in the cart, but add only the new data
          })
          // sthis.cartItems = of(this.cartService.getItems()); // real-time adding in the cart, but get all items then send it to the cart
          this.totalCourses = this.cartService.getItems().length; // to check it the cart contains courses or not
          this.totalPrice = this.cartService.calculateTotal(); // update total price when add new course
        }
      },
      complete: () => {
        // console.log("Complete");
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.cartService.getNewItem().subscribe(obvserver)
  }

  hideCart() {
    this.cartService.hideCart();
  }

  removeItem(item: any): void {
    this.cartService.removeItem(item);
    if(this.totalCourses > 0) {
      this.totalCourses--;
    }
    this.cartItems = of(this.cartService.getItems());
    this.totalPrice = this.cartService.calculateTotal();
  }
}
