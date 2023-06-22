import { Component, Input, OnInit } from '@angular/core';

import { Course } from 'src/app/Models/course';
import { Student } from 'src/app/Models/student';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import { CourseService } from 'src/app/Services/course.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course = {} as Course;
  @Input() studentInCourse: Student[] = [];
  @Input() loading: boolean = true;

  enrolledIn: boolean = false;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private notificationService: NotificationService,
    public courseService: CourseService
  ) { }

  addCourseToCart(course: Course): void {
    try {
      this.shoppingCartService.addItem(course);
      this.shoppingCartService.showCart();
    } catch (error: any) {
      this.notificationService.notify(error.message, 'error');
    }
  }

  ngOnInit() {
    this.courseService.checkEnrolledIn();
  }

  
}
