import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-top-rated-section',
  templateUrl: './top-rated-section.component.html',
  styleUrls: ['./top-rated-section.component.scss']
})
export class TopRatedSectionComponent implements OnInit, OnDestroy {
  courses!: Course[];
  subscription: Subscription = new Subscription();
  subscriptionMore: Subscription = new Subscription();
  topCoursesNumber: number = 3;

  constructor(private http: APIService) {
  }

  ngOnInit(): void {
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data) {
          this.courses = data.items;
          console.log(this.courses);
        }
      },
      complete: () => {
        //console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.subscription = this.http.getAllItem(`Course/top/${this.topCoursesNumber}`).subscribe(obvserver);
  }

  viewMore() {
    this.topCoursesNumber += 3;
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data) {
          this.courses = data.items;
        }
      },
      complete: () => {
        //console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.subscriptionMore = this.http.getAllItem(`Course/top/${this.topCoursesNumber}`).subscribe(obvserver);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionMore.unsubscribe();
  }
}
