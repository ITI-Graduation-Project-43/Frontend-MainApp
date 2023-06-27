import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { WishList } from 'src/app/Models/wishlist';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  constructor(
    private shopCart: ShoppingCartService,
    private apiService: APIService,
    private navigator: Router
  ) {}

  @Input() course: any;
  @Input() buttonText: string = '';

  chooseAction(buttonText: string, wishList: WishList) {
    switch (buttonText) {
      case 'Add to cart':
        this.apiService
          .getItemById('Course', wishList.courseId)
          .subscribe((data: APIResponseVM | any) => {
            let course: Course = data.items[0] as Course;
            this.shopCart.addItem(course);
          });
        break;
      case 'Get started':
        this.navigator.navigateByUrl(
          `/courses/${this.course.courseTitle}/${this.course.courseId}/lesson/-1`
        );
        break;
    }
  }
}
