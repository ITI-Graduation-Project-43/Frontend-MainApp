import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../Services/cart.service';
import { Course } from 'src/app/Models/course';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Course[] = [];
  totalPrice: number = 0;

  constructor(private cartService: ShoppingCartService) {
    this.cartItems = cartService.getItems();
    this.totalPrice = cartService.calculateTotal();
  }

  hideCart() {
    this.cartService.hideCart();
  }
  ngOnInit() {}

  removeItem(item: any): void {
    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.calculateTotal();
  }
}
