import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Course } from '../Models/course';
import { CheckoutService } from '../Checkout/Services/checkout.service';
import { NotificationService } from '../Shared/Services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItems: Course[] = [];
  private show = new BehaviorSubject<boolean>(false);
  private dataSubject = new Subject<Course>();

  constructor(
    private checkoutService: CheckoutService,
    private notificationService: NotificationService
  ) {
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

  getNewItem(): any {
    return this.dataSubject.asObservable(); // to make adding new course in the cart real-time
  }

  addItem(item: Course): void {
    const existingItemIndex = this.cartItems.findIndex(
      (course) => course.id === item.id
    );
    if (existingItemIndex == -1) {
      this.cartItems.push(item);
      this.dataSubject.next(item); //send the updates to the cart
      this.saveCartData();
    } else {
      this.notificationService.notify(
        'The course has been already added before',
        'info'
      );
    }
  }

  removeItem(item: Course): void {
    const spin = document.querySelector('.numberOfItems');

    const index = this.cartItems.findIndex((course) => course.id === item.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.saveCartData();
      if (spin != null) {
        spin.textContent = this.cartItems.length.toFixed();
      }
      if (this.cartItems.length == 0) {
        document.querySelector('.numberOfItems')?.classList.remove('active');
      }
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, course) => total + course.price, 0);
  }

  loadCartData(): void {
    const storedCartData = localStorage.getItem('cart');
    if (storedCartData) {
      const parsedData: Course[] = JSON.parse(storedCartData);
      if (
        Array.isArray(parsedData) &&
        parsedData.every((course) => 'id' in course && 'price' in course)
      ) {
        this.cartItems = parsedData;
      }
    }
  }

  private saveCartData(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.checkoutService.setOrderdItems();
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
