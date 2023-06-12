import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingCartService } from './Services/cart.service';
import { ShoppingCartComponent } from './Core/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'MindMission';

  // ViewChild decorator to get a reference to the view container
  // where the ShoppingCartComponent will be injected
  @ViewChild('cartContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private resolver: ComponentFactoryResolver
  ) {
    // Subscribe to the BehaviorSubject in the shopping cart service.
    // Whenever the BehaviorSubject emits a value, the callback function is called.
    this.subscription = this.cartService.show$.subscribe((show) => {
      // Clear the view container (remove any injected components)
      this.container?.clear();

      // If the BehaviorSubject emitted true, create and inject the ShoppingCartComponent
      if (show) {
        // Resolve a factory for the ShoppingCartComponent
        const factory = this.resolver.resolveComponentFactory(
          ShoppingCartComponent
        );
        // Use the factory to create a ShoppingCartComponent inside the container
        this.container.createComponent(factory);
      }
    });
  }

  // When the component is destroyed (for example, if the user navigates to a different page),
  // the subscription to the BehaviorSubject is unsubscribed to avoid memory leaks.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
