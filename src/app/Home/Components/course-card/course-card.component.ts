import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { Router } from '@angular/router';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnChanges, OnDestroy {
  student !: any
  role !: string;
  @Input()courses : any[] = [];
  cart !: Course[];

  constructor(private http: APIService, private shopCart : ShoppingCartService, private router: Router, private LocalStorageService: LocalStorageService) {
    this.student = LocalStorageService.getUserInfo();
    this.role = LocalStorageService.decodeToken()?.Role;

  }

  ngOnChanges(): void {
    this.student = this.LocalStorageService.getUserInfo();
    this.role = this.LocalStorageService.decodeToken()?.Role;
    if(this.role = 'Student' && this.student) {
      this.loadStudentCoursesEnrolledAndWishlist();
    }
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

  loadStudentCoursesEnrolledAndWishlist() {
    let obvserver = {
      next: (data: any) => {
        if(data) {
          for(let addedCourse of data.wishlist.items) {
            for(let course of this.courses) {
              if(course.id == addedCourse.courseId) {
                course.isEnrollment = true;
              }
            }
          }

          for(let wishlistCourse of data.wishlist.items) {
            for(let course of this.courses) {
              if(course.id == wishlistCourse.courseId) {
                course.isFound = true;
              }
            }
          }
        }
      },
      complete: () => {
        //console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }

    forkJoin({
      wishlist: this.http.getAllItem(`wishlist/student/${this.student.id}`),
      enrolled: this.http.getAllItem(`enrollment/student/${this.student.id}`)
    }).subscribe(obvserver);
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
  }
}
