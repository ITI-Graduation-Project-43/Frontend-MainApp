import {Component, Input } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input()courses !: Course[];
  cart !: Course[];
  constructor(private shopCart : ShoppingCartService, private router: Router, private LocalStorageService: LocalStorageService) {
  }

  rating(number: number): number[] {
    // return Array(+number?.toFixed());
    return [1];
  }

  AddToCart(course: Course) {
    this.shopCart.addItem(course);
  }

  AddToWishlist(course: Course) {
    if(this.LocalStorageService.checkTokenExpiration()) {
      //call API
    }
    else {
      this.router.navigateByUrl("/login");
    }
  }
}
