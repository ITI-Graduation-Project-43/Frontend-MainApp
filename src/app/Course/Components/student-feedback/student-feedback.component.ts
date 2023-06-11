import { Component, Input, OnInit } from '@angular/core';
import { CourseFeedback } from 'src/app/Models/courseFeedback';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.scss'],
})
export class StudentFeedbackComponent implements OnInit {
  @Input() courseId: number = 11;
  @Input() loading: boolean = true;

  courseFeedbacks: CourseFeedback[] = [];
  pageNumber: number = 1;
  pageSize: number = 3;
  totalSize: number = 4;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.loadCourseFeedback();
  }

  loadCourseFeedback() {
    this.feedbackService
      .getCourseFeedback(this.courseId, this.pageNumber, this.pageSize)
      .subscribe(
        (data: APIResponseVM) => {
          if (
            data.success &&
            Array.isArray(data.items) &&
            data.items.length > 0
          ) {
            this.courseFeedbacks = [
              ...this.courseFeedbacks,
              ...(data.items as CourseFeedback[]),
            ];
            console.log(this.courseFeedbacks);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadMoreFeedbacks() {
    this.pageNumber++;
    this.loadCourseFeedback();
  }
}
