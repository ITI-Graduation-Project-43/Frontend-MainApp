import { Observable, catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { APIService } from '../Shared/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends APIService {
  getRecentStudentsInCourse(
    recentNumber: number,
    courseId: number,
    pageNumber: number = 1,
    pageSize: number = 2
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Student/${courseId}/students/${recentNumber}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getCourses(
    studentId: string,
    pageNumber: number = 1,
    pageSize: number = 4
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Enrollment/Student/${studentId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }
  getAllCourses(studentId: string): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Enrollment/Student/${studentId}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }
}
