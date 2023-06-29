import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCourseFeedback } from 'src/app/Models/courseFeedback';
import { CourseDataService } from 'src/app/Services/course-data.service';
import { CourseService } from 'src/app/Services/course.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-course-feedback',
  templateUrl: './course-feedback.component.html',
  styleUrls: ['./course-feedback.component.scss'],
})
export class CourseFeedbackComponent implements OnInit {
  submitted: boolean = false;
  editMode: boolean = false;

  instructorId: string = '';
  courseId: number = 0;
  studentId: string = '';
  courseFeedback: CreateCourseFeedback = {} as CreateCourseFeedback;
  feedbackForm!: FormGroup;

  constructor(
    private apiService: CourseService,
    private courseDataService: CourseDataService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    document.querySelector('.app-header')?.classList.remove('dark-background');
    this.instructorId = this.courseDataService.instructorId;
    this.courseId = this.courseDataService.courseId;
    this.studentId = this.courseDataService.studentId;
    if (this.courseId <= 0 || !this.studentId || !this.instructorId) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.feedbackForm = new FormGroup({
      instructorRating: new FormControl(null, Validators.required),
      courseRating: new FormControl(null, Validators.required),
      feedbackText: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ]),
    });

    this.apiService.getCourseFeedback(this.courseId, this.studentId).subscribe(
      (data) => {
        if (data.success && data.items.length > 0) {
          this.courseFeedback = data.items[0];
          this.feedbackForm.patchValue(this.courseFeedback);
          this.editMode = false;
        } else {
          this.editMode = true;
        }
      },
      (error) => console.log(error)
    );
  }

  edit(): void {
    this.editMode = true;
  }

  onSubmit(): void {
    if (this.feedbackForm.valid && this.feedbackForm.dirty) {
      this.feedbackForm.disable();
      const feedbackData = {
        CourseId: this.courseId,
        StudentId: this.studentId,
        InstructorId: this.instructorId,
        ...this.feedbackForm.value,
      };

      if (this.courseFeedback) {
        this.apiService
          .updateItem(`CourseFeedback/${this.courseFeedback.id}`, feedbackData)
          .subscribe(
            (response) => this.handleResponse(response),
            (error) => this.handleError(error)
          );
      } else {
        this.apiService.addItem('CourseFeedback/Add', feedbackData).subscribe(
          (response) => this.handleResponse(response),
          (error) => this.handleError(error)
        );
      }
    } else if (!this.feedbackForm.dirty && this.courseFeedback) {
      this.editMode = false;
    } else {
      this.notificationService.notify(
        'some fields have invaild data, please make sure to enter valid data',
        'error'
      );
    }
  }

  private handleResponse(response: any) {
    if (response.success) {
      this.submitted = true;
    } else {
      this.handleError(new Error(response.message));
    }
    this.feedbackForm.enable();
  }

  private handleError(error: Error) {
    console.error('Error updating feedback', error);
    this.feedbackForm.enable();
  }
}
