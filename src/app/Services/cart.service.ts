import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../Models/course';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItems: Course[] = [];
  private show = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadCartData();
  }

  get show$(): Observable<boolean> {
    return this.show.asObservable();
  }

  showCart(): void {
    this.show.next(true);
  }

  hideCart(): void {
    this.show.next(false);
  }

  getItems(): Course[] {
    return [...this.cartItems]; // Return a copy to prevent external mutation
  }

  addItem(item: Course): void {
    const existingItemIndex = this.cartItems.findIndex(
      (course) => course.id === item.id
    );
    if (existingItemIndex >= 0) {
      throw new Error('The course is already in the cart.');
    }
    this.cartItems.push(item);
    this.saveCartData();
  }

  removeItem(item: Course): void {
    const index = this.cartItems.findIndex((course) => course.id === item.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.saveCartData();
    } else {
      throw new Error('The course is not in the cart.');
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, course) => total + course.price, 0);
  }

  private loadCartData(): void {
    const storedCartData = localStorage.getItem('cart');
    if (storedCartData) {
      const parsedData: Course[] = JSON.parse(storedCartData);
      if (
        Array.isArray(parsedData) &&
        parsedData.every((course) => 'id' in course && 'price' in course)
      ) {
        this.cartItems = parsedData;
      } else {
        throw new Error('Invalid data in the cart storage.');
      }
    }
  }

  private saveCartData(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
