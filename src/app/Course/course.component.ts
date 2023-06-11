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
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  showMore = false;

  pageNumber: number = 1;
  taughtByInstructorPageNumber: number = 1;

  pageSize: number = 2;

  relatedCoursesTotalCount: number = 0;
  instructorCoursesTotalCount: number = 0;

  course: Course = {} as Course;
  chapters: Chapter[] = [];
  relatedCourses: Course[] = [];
  instructorCourses: Course[] = [];

  constructor(private apiService: CourseService) {}

  ngOnInit() {
    const course$ = this.apiService.getItemById('Course', 11);
    const chapters$ = this.apiService.getItemById('Chapter/byCourse', 11);
    const relatedCourses$ = this.apiService.getRelatedCourses(11);

    forkJoin({ course$, chapters$, relatedCourses$ }).subscribe(
      (data: {
        course$: APIResponseVM;
        chapters$: APIResponseVM;
        relatedCourses$: APIResponseVM;
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
          let courses = relatedCoursesData.items as Course[];
          for (let i = 0; i < courses.length; i++) {
            courses[i].language = mapEnumValue(Language, courses[i].language);
            courses[i].level = mapEnumValue(Level, courses[i].level);
          }
          this.relatedCourses = courses;
          this.relatedCoursesTotalCount = relatedCoursesData.TotalPages;
          console.log(this.relatedCourses);
        }

        // Make instructor courses API call
        this.apiService
          .getInstructorOtherCourses(this.course.instructorId, 11)
          .subscribe(
            (instructorCoursesData: APIResponseVM) => {
              if (
                instructorCoursesData.success &&
                Array.isArray(instructorCoursesData.items) &&
                instructorCoursesData.items.length > 0
              ) {
                let courses = instructorCoursesData.items as Course[];
                for (let i = 0; i < courses.length; i++) {
                  courses[i].language = mapEnumValue(
                    Language,
                    courses[i].language
                  );
                  courses[i].level = mapEnumValue(Level, courses[i].level);
                }
                this.instructorCourses = courses;
                this.instructorCoursesTotalCount = 9;

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

  /* Learningn items */
  getRows() {
    const result = [];
    for (let i = 0; i < this.course.learningItems?.length; i += 2) {
      result.push(this.course.learningItems.slice(i, i + 2));
    }
    return result;
  }

  hasMoreItems() {
    return this.course.learningItems?.length > 2;
  }
  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  /**************************************************************/
  /*  for course content */
  toggleChapter(chapter: Chapter): void {
    chapter.open = !chapter.open;
  }

  getIconByType(type: string): string {
    switch (type) {
      case 'Video':
        return '../../assets/svg/lecture.svg';
      case 'Quiz':
        return '../../assets/svg/pen.svg';
      case 'Article':
        return '../../assets/svg/article.svg';
      default:
        return '';
    }
  }

  /**************************************************************/
  /*  for related courses */
  loadMoreCourses() {
    this.pageNumber++;
    this.apiService
      .getRelatedCourses(11, this.pageNumber, this.pageSize)
      .subscribe(
        (data: APIResponseVM) => {
          if (
            data.success &&
            Array.isArray(data.items) &&
            data.items.length > 0
          ) {
            let courses = data.items as Course[];
            for (let i = 0; i < courses.length; i++) {
              courses[i].language = mapEnumValue(Language, courses[i].language);
              courses[i].level = mapEnumValue(Level, courses[i].level);
            }
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
    this.apiService
      .getInstructorOtherCourses(
        this.course.instructorId,
        11,
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
            let courses = instructorCoursesData.items as Course[];
            for (let i = 0; i < courses.length; i++) {
              courses[i].language = mapEnumValue(Language, courses[i].language);
              courses[i].level = mapEnumValue(Level, courses[i].level);
            }
            this.instructorCourses.push(...courses);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
