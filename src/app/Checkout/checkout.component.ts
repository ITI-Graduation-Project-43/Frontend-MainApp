import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../Shared/Helper/local-storage.service';
import { Router } from '@angular/router';
import { CheckoutService } from './Services/checkout.service';
import { ShoppingCartService } from '../Services/cart.service';
import { NotificationService } from '../Shared/Services/notification.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isThereItems: boolean = true;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private shoppingSerive: ShoppingCartService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    document.querySelector('.app-header')?.classList.remove('dark-background');
    if (!this.localStorageService.checkTokenExpiration()) {
      this.notification.notify('You have to sign in first', 'info');
      this.router.navigateByUrl('/login');
    } else if (!this.shoppingSerive.calculateTotal()) {
      this.isThereItems = false;
    }
  }

  returnToShop() {
    this.router.navigate(['/home'], { fragment: 'courses' });
  }
}
