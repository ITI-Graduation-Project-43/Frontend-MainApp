import { Observable, catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { APIService } from '../Shared/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends APIService {
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
}
