import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseDataService {
  instructorId: string = '';
  courseId: number = 0;
  studentId: string = '';
}
