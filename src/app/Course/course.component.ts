import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { CourseService } from '../Services/course.service';
import { Course } from '../Models/course';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { mapEnumValue } from '../Shared/Helper/EnumMapper';
import { Language } from '../Models/Enums/CourseLanguage';
import { Level } from '../Models/Enums/CourseLevel';
import { LessonType } from '../Models/Enums/LessonType';
import { Chapter } from '../Models/chapter';
import { Student } from '../Models/student';
import { StudentService } from '../Services/student.service';
import { courseStudents } from '../Models/courseStudents';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courseId: number = 11;

  pageNumber: number = 1;
  taughtByInstructorPageNumber: number = 1;

  pageSize: number = 2;

  relatedCoursesTotalCount: number = 0;
  instructorCoursesTotalCount: number = 0;

  course: Course = {} as Course;
  chapters: Chapter[] = [];

  relatedCourses: courseStudents[] = [];
  instructorCourses: courseStudents[] = [];

  courseStudents: Course[] = [];
  studentInCourse: Student[] = [];

  constructor(
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const course$ = this.courseService.getItemById('Course', this.courseId);
    const chapters$ = this.courseService.getItemById(
      'Chapter/byCourse',
      this.courseId
    );
    const relatedCourses$ = this.courseService.getRelatedCoursesWithStudents(
      this.courseId,
      4,
      this.pageNumber,
      this.pageSize
    );
    const studentInCourse$ = this.studentService.getRecentStudentsInCourse(
      4,
      this.courseId,
      1,
      4
    );

    forkJoin({
      course$,
      chapters$,
      relatedCourses$,
      studentInCourse$,
    }).subscribe(
      (data: {
        course$: APIResponseVM;
        chapters$: APIResponseVM;
        relatedCourses$: APIResponseVM;
        studentInCourse$: APIResponseVM;
      }) => {
        // Handling course data
        const courseData = data.course$;
        if (
          courseData.success &&
          Array.isArray(courseData.items) &&
          courseData.items.length > 0
        ) {
          const courses = courseData.items as Course[];
          courses[0].language = mapEnumValue(Language, courses[0].language);
          courses[0].level = mapEnumValue(Level, courses[0].level);
          this.course = courses[0];
          console.log(this.course);
        }

        // Handling chapters data
        const chaptersData = data.chapters$;
        if (
          chaptersData.success &&
          Array.isArray(chaptersData.items) &&
          chaptersData.items.length > 0
        ) {
          this.chapters = chaptersData.items;
          for (let i = 0; i < this.chapters.length; i++) {
            this.chapters[i].open = false;
            for (let j = 0; j < this.chapters[i].lessons.length; j++) {
              this.chapters[i].lessons[j].type = mapEnumValue(
                LessonType,
                this.chapters[i].lessons[j].type
              );
            }
          }
          console.log(this.chapters);
        }

        // Handling related courses data
        const relatedCoursesData = data.relatedCourses$;
        if (
          relatedCoursesData.success &&
          Array.isArray(relatedCoursesData.items) &&
          relatedCoursesData.items.length > 0
        ) {
          let courses = relatedCoursesData.items as courseStudents[];

          this.relatedCourses = courses;
          this.relatedCoursesTotalCount = 9 || relatedCoursesData.TotalPages;
          console.log(this.relatedCourses);
        }

        // Handling student in course data
        const studentInCourseData = data.studentInCourse$;
        if (
          studentInCourseData.success &&
          Array.isArray(studentInCourseData.items) &&
          studentInCourseData.items.length > 0
        ) {
          this.studentInCourse = studentInCourseData.items;
          console.log(this.studentInCourse);
        }

        // Make instructor courses API call
        this.courseService
          .getInstructorOtherCoursesWithStudents(
            this.course.instructorId,
            this.courseId,
            4,
            this.taughtByInstructorPageNumber,
            this.pageSize
          )
          .subscribe(
            (instructorCoursesData: APIResponseVM) => {
              if (
                instructorCoursesData.success &&
                Array.isArray(instructorCoursesData.items) &&
                instructorCoursesData.items.length > 0
              ) {
                let courses = instructorCoursesData.items as courseStudents[];

                this.instructorCourses = courses;
                this.instructorCoursesTotalCount =
                  9 || relatedCoursesData.TotalPages;
                console.log(this.instructorCourses);
              }
            },
            (error) => {
              console.error(error);
            }
          );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**************************************************************/
  /*  for course content */

  /**************************************************************/
  /*  for related courses */
  loadMoreCourses() {
    this.pageNumber++;
    this.courseService
      .getRelatedCoursesWithStudents(
        this.courseId,
        4,
        this.pageNumber,
        this.pageSize
      )
      .subscribe(
        (data: APIResponseVM) => {
          if (
            data.success &&
            Array.isArray(data.items) &&
            data.items.length > 0
          ) {
            let courses = data.items as courseStudents[];
            this.relatedCourses.push(...courses);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadMoreInstrucorCourses() {
    this.taughtByInstructorPageNumber++;
    this.courseService
      .getInstructorOtherCoursesWithStudents(
        this.course.instructorId,
        this.courseId,
        4,
        this.taughtByInstructorPageNumber,
        this.pageSize
      )
      .subscribe(
        (instructorCoursesData: APIResponseVM) => {
          if (
            instructorCoursesData.success &&
            Array.isArray(instructorCoursesData.items) &&
            instructorCoursesData.items.length > 0
          ) {
            let courses = instructorCoursesData.items as courseStudents[];
            this.instructorCourses.push(...courses);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
