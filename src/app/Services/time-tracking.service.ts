import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  constructor(private http: HttpClient) {}

  recordStartTime(studentId: string, courseId: number) {
    const url = `${environment.APIURL}/timetracking/start`;
    return this.http.post(url, { studentId, courseId });
  }
  recordEndTime(studentId: string, courseId: number) {
    const url = `${environment.APIURL}/timetracking/end`;
    return this.http.post(url, { studentId, courseId });
  }
}
