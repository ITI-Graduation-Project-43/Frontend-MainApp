import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Services/student.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  studentId: string = '01060862-5c2f-4a0a-8fac-93afc762ac53';
  student: any[] = [];
  accounts: any[] = [];
  studentCourses: any[] = [];
  pageNumber: number = 1;
  CoursesPageNumber: number = 1;
  pageSize: number = 4;
  totalSize!: number;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    document.querySelector('.app-header')?.classList.add('dark-background');
    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.loadStudentCourses();
    this.studentService
      .getAllCourses(this.studentId)
      .subscribe((data: APIResponseVM) => {
        this.totalSize = (data.totalPages - 1) * data.itemsPerPage;
      });
    this.studentService.getItemById('Student', this.studentId).subscribe(
      (data: APIResponseVM) => {
        if (data.items && data.items.length > 0) {
          this.student = data.items;
          console.log(this.student[0]);
          this.accounts = this.student[0].accounts;
        } else {
          console.log('No student data available.');
        }
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
  viewLessCourses() {
    this.studentCourses.splice(4);
  }
}
