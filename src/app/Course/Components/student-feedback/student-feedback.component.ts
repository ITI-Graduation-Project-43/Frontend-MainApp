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
  allFeedbacks: CourseFeedback[] = [];
  pageNumber: number = 1;
  pageSize: number = 3;
  totalSize: number = 0;
  showAll: boolean = false;

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
            this.courseFeedbacks = [...this.courseFeedbacks, ...data.items];
            this.allFeedbacks = [...this.allFeedbacks, ...data.items];
            this.totalSize = data.totalPages * data.itemsPerPage;
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadMoreFeedbacks() {
    if (!this.showAll) {
      this.pageNumber++;
      if (this.pageNumber * this.pageSize > this.allFeedbacks.length) {
        this.loadCourseFeedback();
      } else {
        this.courseFeedbacks = this.allFeedbacks.slice(
          0,
          this.pageSize * this.pageNumber
        );
      }
    } else {
      this.pageNumber--;
      if (this.pageNumber < 1) this.pageNumber = 1;
      this.courseFeedbacks = this.allFeedbacks.slice(
        0,
        this.pageSize * this.pageNumber
      );
      if (this.pageNumber === 1) this.showAll = false;
    }
  }

  showViewMoreButton(): boolean {
    if (!this.showAll) {
      const currentPageSize =
        (this.pageNumber - 1) * this.pageSize + this.courseFeedbacks.length;
      if (currentPageSize < this.totalSize) {
        return true;
      } else {
        this.showAll = true;
        return this.showAll;
      }
    } else {
      return true;
    }
  }

  getShowMoreButtonText(): string {
    return this.showAll ? 'Show Less' : 'Show More';
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
