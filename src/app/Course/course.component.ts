import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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

const COURSE = 'Course';
const CHAPTER_BY_COURSE = 'Chapter/byCourse';
const INITIAL_PAGE_SIZE = 2;
const INITIAL_PAGE_NUMBER = 1;
const STUDENTS_NUMBER = 4;
const DEFAULT_PAGE_SIZE = 4;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  @ViewChild('courseCard') courseCardRef!: ElementRef;
  private courseCard!: HTMLElement;
  private windowHeight: number = 0;
  private headerHeight: number = 0;
  private footerHeight: number = 0;

  // Properties
  courseId: number = 11;
  pageNumber: number = INITIAL_PAGE_NUMBER;
  taughtByInstructorPageNumber: number = INITIAL_PAGE_NUMBER;
  pageSize: number = INITIAL_PAGE_SIZE;
  relatedCoursesTotalCount: number = 0;
  instructorCoursesTotalCount: number = 0;

  loading: boolean = false;
  errorMessage: string | null = null;

  // Models
  course: Course = {} as Course;
  chapters: Chapter[] = [];
  relatedCourses: courseStudents[] = [];
  instructorCourses: courseStudents[] = [];
  studentInCourse: Student[] = [];

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    document.querySelector('.app-header')?.classList.add('dark-background');
    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
      this.courseService.courseId = this.courseId;
      this.loadData();
    });
  }
  ngAfterViewInit(): void {
    this.courseCard = this.courseCardRef.nativeElement;
    this.windowHeight = window.innerHeight;
    this.headerHeight = 80;
    this.footerHeight = 400;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth > 1300) {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollTop < this.headerHeight) {
        this.courseCard.style.position = 'absolute';
        this.courseCard.style.top = '0.5rem';
      } else if (
        scrollTop + this.windowHeight >
        document.body.clientHeight - this.footerHeight
      ) {
        this.courseCard.style.position = 'fixed';
        this.courseCard.style.bottom = '30rem';
        this.courseCard.style.top = 'auto';
      } else {
        this.courseCard.style.position = 'fixed';
        this.courseCard.style.top = '1.6rem';
      }
    }
  }

  loadData() {
    this.loading = true;
    forkJoin({
        course: this.courseService.getItemById(COURSE, this.courseId),
        chapters: this.courseService.getItemById(CHAPTER_BY_COURSE, this.courseId),
        relatedCourses: this.courseService.getRelatedCoursesWithStudents(this.courseId, STUDENTS_NUMBER, this.pageNumber,this.pageSize),
        students: this.studentService.getRecentStudentsInCourse(STUDENTS_NUMBER, this.courseId, INITIAL_PAGE_NUMBER, DEFAULT_PAGE_SIZE),
      }).subscribe(
      (data) => {
        this.handleResponse(data.course, (courses: Course[]) => {
          courses[0].language = mapEnumValue(Language, courses[0].language);
          courses[0].level = mapEnumValue(Level, courses[0].level);
          this.course = courses[0];
        });

        this.handleResponse(data.chapters, (chapters: Chapter[]) => {
          chapters.forEach((chapter) => {
            chapter.open = false;
            chapter.lessons.forEach((lesson) => {
              lesson.type = mapEnumValue(LessonType, lesson.type);
            });
          });
          this.chapters = chapters;
        });

        this.handleResponse(data.relatedCourses, (courses: courseStudents[]) => {
            this.relatedCourses = courses;
            this.relatedCoursesTotalCount = data.relatedCourses.totalPages;
          }
        );

        this.handleResponse(data.students, (students: Student[]) => {
          this.studentInCourse = students;
        });
        this.loading = false;
        this.loadInstructorCourses();
      },
      (error) => {
        this.handleError(error);
        this.loading = false;
      }
    );
  }

  loadInstructorCourses() {
    this.courseService
      .getInstructorOtherCoursesWithStudents(
        this.course.instructorId,
        this.courseId,
        STUDENTS_NUMBER,
        this.taughtByInstructorPageNumber,
        this.pageSize
      )
      .subscribe(
        (data) =>
          this.handleResponse(data, (courses: courseStudents[]) => {
            this.instructorCourses = courses;
            this.instructorCoursesTotalCount = data.totalPages;
          }),
        (error) => {
          this.handleError(error);
        }
      );
  }

  loadMoreCourses() {
    this.pageNumber++;
    this.courseService
      .getRelatedCoursesWithStudents(
        this.courseId,
        STUDENTS_NUMBER,
        this.pageNumber,
        this.pageSize
      )
      .subscribe(
        (data) =>
          this.handleResponse(data, (courses: courseStudents[]) => {
            this.relatedCourses.push(...courses);
          }),
        (error) => {
          this.handleError(error);
        }
      );
  }

  loadMoreInstructorCourses() {
    this.taughtByInstructorPageNumber++;
    this.courseService
      .getInstructorOtherCoursesWithStudents(
        this.course.instructorId,
        this.courseId,
        STUDENTS_NUMBER,
        this.taughtByInstructorPageNumber,
        this.pageSize
      )
      .subscribe(
        (data) =>
          this.handleResponse(data, (courses: courseStudents[]) => {
            this.instructorCourses.push(...courses);
          }),
        (error) => {
          this.handleError(error);
        }
      );
  }

  handleResponse<T>(response: APIResponseVM, handler: (data: T[]) => void) {
    if (response.success) {
      if (Array.isArray(response.items) && response.items.length > 0) {
        handler(response.items as T[]);
      } else {
        this.errorMessage = 'No data available.';
      }
    } else {
      this.errorMessage =
        response.message || 'An error occurred while fetching data.';
    }
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);

    this.errorMessage =
      'An error occurred while loading the data. Please try again later.';

    if (error.status === 404) {
      this.errorMessage = 'The requested data could not be found.';
    } else if (error.status === 500) {
      this.errorMessage =
        'There was a problem with the server. Please try again later.';
    }
  }
}
