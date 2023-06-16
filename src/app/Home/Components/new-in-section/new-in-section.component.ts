import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/Models/course';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-new-in-section',
  templateUrl: './new-in-section.component.html',
  styleUrls: ['./new-in-section.component.scss']
})
export class NewInSectionComponent implements OnInit, OnDestroy {
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
