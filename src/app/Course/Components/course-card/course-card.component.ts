import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Course } from 'src/app/Models/course';
import { Student } from 'src/app/Models/student';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import { CourseService } from 'src/app/Services/course.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit, AfterViewInit {
  private headerHeight: number = 0;
  isScroll: boolean = false;

  @Input() course: Course = {} as Course;
  @Input() studentInCourse: Student[] = [];
  @Input() loading: boolean = true;

  enrolledIn: boolean = false;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private notificationService: NotificationService,
    public courseService: CourseService
  ) {}

  ngOnInit() {
    this.courseService.checkEnrolledIn();
  }

  ngAfterViewInit(): void {
    this.headerHeight = 600;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth > 1300) {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollTop > this.headerHeight) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    }
  }

  addCourseToCart(course: Course): void {
    try {
      this.shoppingCartService.addItem(course);
      this.shoppingCartService.showCart();
    } catch (error: any) {
      this.notificationService.notify(error.message, 'error');
    }
  }
}
