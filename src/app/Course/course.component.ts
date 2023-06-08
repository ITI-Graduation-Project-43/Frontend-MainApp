import { Component, OnInit } from '@angular/core';

import { APIService } from '../Shared/Services/api.service';
import { Course } from '../Models/course';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { mapEnumValue } from '../Shared/Helper/EnumMapper';
import { Language } from '../Models/Enums/CourseLanguage';
import { Level } from '../Models/Enums/CourseLevel';
import { LessonType } from '../Models/Enums/LessonType';
import { Chapter, ChapterLesson } from '../Models/chapter';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  showMore = false;
  chapterss = [
    {
      title: 'Chapter 1',
      open: false,
      lessons: [
        { title: 'Introduction Lecture', icon: '../../assets/svg/lecture.svg' },
        { title: 'Introduction Exercise', icon: '../../assets/svg/pen.svg' },
        { title: 'Introduction Article', icon: '../../assets/svg/article.svg' },
      ],
    },
    {
      title: 'Chapter 1',
      open: false,
      lessons: [
        { title: 'Introduction Lecture', icon: '../../assets/svg/lecture.svg' },
        { title: 'Introduction Exercise', icon: '../../assets/svg/pen.svg' },
        { title: 'Introduction Article', icon: '../../assets/svg/article.svg' },
      ],
    },
    {
      title: 'Chapter 1',
      open: false,
      lessons: [
        { title: 'Introduction Lecture', icon: '../../assets/svg/lecture.svg' },
        { title: 'Introduction Exercise', icon: '../../assets/svg/pen.svg' },
        { title: 'Introduction Article', icon: '../../assets/svg/article.svg' },
      ],
    },
  ];
  course: Course = {} as Course;
  chapters: Chapter[] = [];
  relatedCourses: Course[] = [];
  instructorCourses: Course[] = [];
  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.apiService.getItemById('Course', 11).subscribe(
      (data: APIResponseVM) => {
        if (
          data.success &&
          Array.isArray(data.items) &&
          data.items.length > 0
        ) {
          const courses = data.items as Course[];

          courses[0].language = mapEnumValue(Language, courses[0].language);
          courses[0].level = mapEnumValue(Level, courses[0].level);

          this.course = courses[0];
          console.log(this.course);
        }
      },
      (error) => {
        console.error(error);
      }
    );
    this.apiService.getItemById('Chapter/byCourse', 11).subscribe(
      (data: APIResponseVM) => {
        if (
          data.success &&
          Array.isArray(data.items) &&
          data.items.length > 0
        ) {
          this.chapters = data.items;

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
      },
      (error) => {
        console.error(error);
      }
    );
    this.apiService
      .getItemById('Course/category', this.course.categoryId)
      .subscribe(
        (data: APIResponseVM) => {
          if (
            data.success &&
            Array.isArray(data.items) &&
            data.items.length > 0
          ) {
            const courses = data.items as Course[];

            courses[0].language = mapEnumValue(Language, courses[0].language);
            courses[0].level = mapEnumValue(Level, courses[0].level);

            this.course = courses[0];
            console.log(this.course);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  /* Learningn items */
  getRows() {
    const result = [];
    for (let i = 0; i < this.course.learningItems.length; i += 2) {
      result.push(this.course.learningItems.slice(i, i + 2));
    }
    return result;
  }

  hasMoreItems() {
    return this.course.learningItems.length > 2;
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
}
