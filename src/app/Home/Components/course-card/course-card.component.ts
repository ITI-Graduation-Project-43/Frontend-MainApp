import {Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { Router } from '@angular/router';
import { Student } from 'src/app/Models/student';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnChanges, OnDestroy {
  student !: any
  @Input()courses !: any;
  cart !: Course[];
  wishlist : Subscription = new Subscription();
  added : Subscription = new Subscription();

  constructor(private http: APIService, private shopCart : ShoppingCartService, private router: Router, private LocalStorageService: LocalStorageService) {
    this.student = LocalStorageService.getUserInfo();
    this.getStudentWishlist();
    this.getStudentAddCourses();
  }

  ngOnChanges(): void {
    this.getStudentWishlist();
    this.getStudentAddCourses();
  }

  rating(number: number = 1): number[] {
    return Array(+number?.toFixed());
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

  getStudentWishlist() {
    if(this.student != null){
      let obvserver = {
        next: (data: APIResponseVM) => {
          if(data.success) {
            for(let wishlistCourse of data.items) {
              for(let course of this.courses) {
                if(course.id == wishlistCourse.courseId) {
                  course.isFound = true;
                }
              }
            }
          }
        },
        complete: () => {
        },
        error: (error: Error) => {
          console.log(error);
        }
      }
      this.wishlist = this.http.getAllItem(`wishlist/student/${this.student.id}`).subscribe(obvserver)
    }
  }

  getStudentAddCourses() {
    if(this.student != null){
      let obvserver = {
        next: (data: APIResponseVM) => {
          if(data.success) {
            for(let addedCourse of data.items) {
              for(let course of this.courses) {
                if(course.id == addedCourse.courseId) {
                  course.isEnrollment = true;
                }
              }
            }
          }
        },
        error: (error: Error) => {
          console.log(error);
        }
      }
      this.added = this.http.getAllItem(`enrollment/student/${this.student.id}`).subscribe(obvserver)
    }
  }

  checkPosition(course: HTMLElement, details: HTMLElement) {
    let poisition = course.getBoundingClientRect();
    details.classList.add("hovered");
    if(!((window.innerWidth - poisition.x) > poisition.width * 2)) {
      details.classList.add("open-right");
    }
  }

  resetPosition(details: HTMLElement) {
    details.classList.remove("hovered");
    details.classList.remove("open-right");
  }

  ngOnDestroy(): void {
    this.wishlist.unsubscribe();
    this.added.unsubscribe();
  }
}
