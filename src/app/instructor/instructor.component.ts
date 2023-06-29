import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../Services/feedback.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { InstructorService } from '../Services/instructor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss'],
})
export class InstructorComponent implements OnInit {
  instructorId: string = '4ae72bce-ddd7-45da-ac42-780deb784c9d';
  instructor: any[] = [];
  accounts: any[] = [];
  instructorFeedbacks: any[] = [];
  instructorCourses: any[] = [];
  pageNumber: number = 1;
  CoursesPageNumber: number = 1;
  pageSize: number = 4;
  feedbackPageSize: number = 4;
  totalSize!: number;
  feedbackTotalSize!: number;

  constructor(
    private instructorService: InstructorService,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    document.querySelector('.app-header')?.classList.add('dark-background');
    this.route.params.subscribe((params) => {
      this.instructorId = params['id'];
    });
    this.loadInstructorFeedback();
    this.loadInstructorCourses();
    // this.instructorService
    //   .getAllCourses(this.instructorId)
    //   .subscribe((data: APIResponseVM) => {
    //     this.totalSize = (data.totalPages - 1) * data.itemsPerPage;
    //   });
    this.instructorService
      .getItemById('Instructor', this.instructorId)
      .subscribe(
        (data: APIResponseVM) => {
          if (data.items && data.items.length > 0) {
            this.instructor = data.items;
            console.log(this.instructor[0]);
            this.accounts = this.instructor[0].accounts;
            this.totalSize = this.instructor[0].noOfCources;
            this.feedbackTotalSize = this.instructor[0].noOfRating;
          } else {
            console.log('No instructor data available.');
          }
        },
        (error) => {
          console.log('failed to get instructor');
        }
      );
  }

  loadInstructorCourses() {
    this.instructorService
      .getCourses(this.instructorId, this.CoursesPageNumber, this.pageSize)
      .subscribe(
        (data: APIResponseVM) => {
          if (
            data.success &&
            Array.isArray(data.items) &&
            data.items.length > 0
          ) {
            this.instructorCourses = [
              ...this.instructorCourses,
              ...(data.items as any[]),
            ];
            console.log(this.instructorCourses);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  loadMoreCourses() {
    this.CoursesPageNumber++;
    this.loadInstructorCourses();
  }
  viewLessCourses() {
    this.instructorCourses.splice(4);
  }

  loadInstructorFeedback() {
    this.feedbackService
      .getInstructorFeedback(
        this.instructorId,
        this.pageNumber,
        this.feedbackPageSize
      )
      .subscribe(
        (data: APIResponseVM) => {
          if (
            data.success &&
            Array.isArray(data.items) &&
            data.items.length > 0
          ) {
            this.instructorFeedbacks = [
              ...this.instructorFeedbacks,
              ...(data.items as any[]),
            ];
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadMoreFeedbacks() {
    this.pageNumber++;
    this.loadInstructorFeedback();
  }

  viewLessFeedbacks() {
    this.instructorFeedbacks.splice(4);
  }
}
