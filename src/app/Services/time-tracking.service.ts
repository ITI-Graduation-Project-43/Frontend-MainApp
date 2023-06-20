import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  constructor(private http: HttpClient) {}

  recordStartTime(studentId: string, courseId: number) {
    const url = `${environment.APIURL}TimeTracking/course/${courseId}/student/${studentId}`;
    return this.http.post<any>(url, {});
  }
  recordEndTime(studentId: string, courseId: number) {
    const url = `${environment.APIURL}TimeTracking/course/${courseId}/student/${studentId}`;
    return this.http.put<any>(url, {});
  }
  recentStudent(courseId: number) {
    const url = `${environment.APIURL}TimeTracking/recentStudent/${courseId}`;
    return this.http.get<any>(url);
  }
  GetCourseVisitCount(courseId: number) {
    const url = `${environment.APIURL}TimeTracking/CourseCount/${courseId}`;
    return this.http.get<any>(url);
  }
  GetTotalHours(instructorId: string) {
    const url = `${environment.APIURL}TimeTracking/hours/${instructorId}`;
    return this.http.get<any>(url);
  }
}
