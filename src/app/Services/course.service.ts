import { environment } from 'src/environments/environment';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { APIService } from '../Shared/Services/api.service';
import { Observable, catchError, retry } from 'rxjs';

export class CourseService extends APIService {
  getRelatedCourses(courseId: number): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/${courseId}/related`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }
  getInstructorOtherCourses(
    instructorId: string,
    courseId: number
  ): Observable<APIResponseVM> {
    const url = `${environment.APIURL}Course/instructorOtherCourses/${instructorId}?courseId=${courseId}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }
}
