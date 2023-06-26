import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Services/student.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  studentId: string = '08c8abfe-3896-4bfc-bfaa-1b3ee5240c83';
  student: any[] = [];
  studentCourses: any[] = [];
  pageNumber: number = 1;
  CoursesPageNumber: number = 1;
  pageSize: number = 4;
  totalSize!: number;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    document.querySelector(".app-header")?.classList.add("dark-background")
    this.loadStudentCourses();
    this.studentService
      .getAllCourses(this.studentId)
      .subscribe((data: APIResponseVM) => {
        this.totalSize = data.items.length;
      });
    this.studentService.getItemById('Student', this.studentId).subscribe(
      (data: APIResponseVM) => {
        this.student = data.items;
        console.log(this.student[0]);
      },
      (error) => {
        console.log('failed to get student');
      }
    );
  }

  loadStudentCourses() {
    this.studentService
      .getCourses(this.studentId, this.CoursesPageNumber, this.pageSize)
      .subscribe(
        (data: APIResponseVM) => {
          if (
            data.success &&
            Array.isArray(data.items) &&
            data.items.length > 0
          ) {
            this.studentCourses = [
              ...this.studentCourses,
              ...(data.items as any[]),
            ];
            console.log(this.studentCourses);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  loadMoreCourses() {
    this.CoursesPageNumber++;
    this.loadStudentCourses();
  }
}
