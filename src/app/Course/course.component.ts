import { Component, OnInit } from '@angular/core';

import { APIService } from '../Shared/Services/api.service';
import { Course } from '../Models/course';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { mapEnumValue } from '../Shared/Helper/EnumMapper';
import { Language } from '../Models/Enums/CourseLanguage';
import { Level } from '../Models/Enums/CourseLevel';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  showMore = false;

  chapters = [
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
  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.apiService.getItemById('course', 11).subscribe(
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

  getRows() {
    const result = [];
    for (let i = 0; i < this.course.learningItems.length; i += 2) {
      result.push(this.course.learningItems.slice(i, i + 2));
    }
    return result;
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  toggleChapter(chapter: any): void {
    chapter.open = !chapter.open;
  }
}
