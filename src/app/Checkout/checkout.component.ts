import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../Shared/Helper/local-storage.service';
import { Router } from '@angular/router';
import { CheckoutService } from './Services/checkout.service';
import { ShoppingCartService } from '../Services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService, private router: Router, private shoppingSerive:ShoppingCartService) { }

  ngOnInit(): void {
    if (!this.localStorageService.checkTokenExpiration()) {
      alert("You have to sign in first");
      this.router.navigateByUrl('/login');
    } else if (!this.shoppingSerive.calculateTotal()) {
      alert("You have to add courses to your cart first");
      this.router.navigateByUrl('/home');
    }
  }



}
