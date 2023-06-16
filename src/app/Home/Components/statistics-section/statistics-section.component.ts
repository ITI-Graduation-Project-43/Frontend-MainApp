import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-statistics-section',
  templateUrl: './statistics-section.component.html',
  styleUrls: ['./statistics-section.component.scss']
})
export class StatisticsSectionComponent {
  AvailableCourseSubscribtion: Subscription = new Subscription();

  numberOfCoursesAvailable: number;
  numberOfSuccessfulLearners: number;
  numberOfFiveStarInstructors: number;
  averageCourseRating: number;

  constructor(private http: APIService) {
    this.numberOfCoursesAvailable = this.numberOfSuccessfulLearners = this.numberOfFiveStarInstructors = this.averageCourseRating = 0;
    this.getAvailableCourses();
  }

  getAvailableCourses(): void {
    let obvserver = {
      next: (data: APIResponseVM) : any => {
        if(data) {
          this.numberOfCoursesAvailable = data.items.length;
        }
      },
      complete: () => {
        //console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.http.getAllItem("course").subscribe(obvserver)
  }

  ngOnDestroy(): void {
    this.AvailableCourseSubscribtion.unsubscribe();
  }
}
