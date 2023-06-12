import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private cartService: ShoppingCartService) {}

  showCart() {
    this.cartService.showCart();
  }
}
