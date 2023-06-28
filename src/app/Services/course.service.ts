import { Observable, catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { APIService } from '../Shared/Services/api.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../Shared/Helper/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends APIService {
  loggedIn: boolean = false;
  enrolledIn: boolean = false;

  studentId: number = -1;
  courseId: number = -1;
  enrollmentData: any;

  constructor(
    http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    super(http);
    if (localStorageService.checkTokenExpiration()) {
      this.loggedIn = true;
      this.studentId = localStorageService.decodeToken().Id;
    } else {
      this.loggedIn = false;
    }
  }

  checkEnrolledIn() {
    if (!this.studentId || this.studentId < 1) return;
    this.getAllItem(
      `Enrollment/Student/${this.studentId}/Course/${this.courseId}`
    ).subscribe(
      (data: APIResponseVM) => {
        if (data.success) {
          this.enrollmentData = data.items[0];
          this.enrolledIn = true;
        } else {
          this.enrollmentData = null;
          this.enrolledIn = false;
        }
      },
      (error) => {
        this.enrollmentData = null;
        this.enrolledIn = false;
      }
    );
  }

  getRelatedCourses(
    courseId: number,
    pageNumber: number = 1,
    pageSize: number = 2
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/${courseId}/related?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }
  getInstructorOtherCourses(
    instructorId: string,
    courseId: number,
    pageNumber: number = 1,
    pageSize: number = 2
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/${courseId}/instructor/${instructorId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getCourseWithStudents(
    courseId: number,
    studentsNumber: number,
    pageNumber: number = 1,
    pageSize: number = 4
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/${courseId}/students/${studentsNumber}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getRelatedCoursesWithStudents(
    courseId: number,
    studentsNumber: number,
    pageNumber: number = 1,
    pageSize: number = 2
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/${courseId}/related/${studentsNumber}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getInstructorOtherCoursesWithStudents(
    instructorId: string,
    courseId: number,
    studentsNumber: number,
    pageNumber: number = 1,
    pageSize: number = 2
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/${courseId}/instructor/${instructorId}/${studentsNumber}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getCourseFeedback(
    courseId: number,
    studentId: string
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}CourseFeedback/StudentFeedback?studentId=${studentId}&courseId=${courseId}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }
}
