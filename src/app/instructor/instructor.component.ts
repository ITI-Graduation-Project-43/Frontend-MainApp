import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../Services/feedback.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { InstructorService } from '../Services/instructor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss'],
})
export class InstructorComponent implements OnInit {
  instructorId: string = '4ae72bce-ddd7-45da-ac42-780deb784c9d';
  instructor: any[] = [];
  instructorFeedbacks: any[] = [];
  instructorCourses: any[] = [];
  pageNumber: number = 1;
  CoursesPageNumber: number = 1;
  pageSize: number = 4;
  totalSize!: number;

  constructor(
    private instructorService: InstructorService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadInstructorFeedback();
    this.loadInstructorCourses();
    this.instructorService
      .getAllCourses(this.instructorId)
      .subscribe((data: APIResponseVM) => {
        this.totalSize = data.items.length;
      });
    this.instructorService
      .getItemById('Instructor', this.instructorId)
      .subscribe(
        (data: APIResponseVM) => {
          this.instructor = data.items;
          console.log(this.instructor[0]);
        },
        (error) => {
          this.router.navigateByUrl('');
        }
      );
  }

  redirectToGitHub() {
    window.open(this.instructor[0].accounts.GitHub, '_blank');
  }
  redirectToLinkedin() {
    window.open(this.instructor[0].accounts.Linkedin, '_blank');
  }
  redirectToTwitter() {
    window.open(this.instructor[0].accounts.Twitter, '_blank');
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

  loadInstructorFeedback() {
    this.feedbackService
      .getInstructorFeedback(this.instructorId, this.pageNumber, this.pageSize)
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
}
