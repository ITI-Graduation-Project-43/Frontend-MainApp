import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  constructor(private http: HttpClient) {}

  recordStartTime(studentId: string, courseId: number) {
    const url = `${environment.APIURL}/timetracking/course/${courseId}/student/${studentId}`;
    return this.http.post<any>(url, {});
  }
  recordEndTime(studentId: string, courseId: number) {
    const url = `${environment.APIURL}/timetracking/course/${courseId}/student/${studentId}`;
    return this.http.put<any>(url, {});
  }
}
