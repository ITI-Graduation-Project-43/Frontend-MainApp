import { Component } from '@angular/core';
import { CourseFeedback } from 'src/app/Models/courseFeedback';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
export class TestimonialsSectionComponent {
  feedbacks !: CourseFeedback[];
  constructor(private http: APIService) {
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data) {
          this.feedbacks = data.items;
        }
      },
      complete: () => {
        //console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }

    this.http.getAllItem("CourseFeedback/Course?NumberOfCourses=3").subscribe(obvserver)
  }


}
