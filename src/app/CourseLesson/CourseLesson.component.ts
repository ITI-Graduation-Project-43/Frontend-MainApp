import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Chapter } from '../Models/chapter';
import { CourseService } from '../Services/course.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { mapEnumValue } from '../Shared/Helper/EnumMapper';
import { LessonType } from '../Models/Enums/LessonType';
import { Lesson } from '../Models/lesson';
import { QuizService } from '../Services/quiz.service';
import { CourseContentNavigationService } from '../Services/course-content-navigation.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

const CHAPTER_BY_COURSE = 'Chapter/byCourse';
const LESSON_API_ROUTE = 'Lesson';

@Component({
  selector: 'app-CourseContent',
  templateUrl: './CourseLesson.component.html',
  styleUrls: ['./CourseLesson.component.scss'],
})

//TODO : Refactor code , Style the HTML
export class CourseLessonComponent implements OnInit {
  courseId: number = 0;
  lessonId: number = 0;
  firstLessonId: number = 0;
  lastLessonId: number = 0;
  loading: boolean = true;
  totalLessonCount: number = 0;
  totalHoursCount: number = 0;
  chaptersCount: number = 0;
  errorMessage: string = '';
  public LessonType = LessonType;
  incorrectAnswers: number[] = [];
  chapters: Chapter[] = [];
  lesson: Lesson = {} as Lesson;
  quizResult: { correct: number; total: number } | null = null;
  quizAnswers: { [questionId: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private navigationService: CourseContentNavigationService,
    private quizService: QuizService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.courseId = +params['courseId'];
      this.lessonId = +params['lessonId'];
      this.loadCourseContent();
    });
  }

  loadCourseContent() {
    this.loadChapters();
    this.loadLesson();
  }

  loadChapters() {
    this.courseService.getItemById(CHAPTER_BY_COURSE, this.courseId).subscribe(
      (data) => this.handleChaptersResponse(data),
      (error) => this.handleError(error)
    );
  }

  loadLesson() {
    if (this.lessonId) {
      this.courseService.getItemById(LESSON_API_ROUTE, this.lessonId).subscribe(
        (data) => this.handleLessonResponse(data),
        (error) => this.handleError(error)
      );
    }
  }

  displaySelectedLesson(lessonId: number): void {
    this.lessonId = lessonId;
    this.courseService.getItemById(LESSON_API_ROUTE, this.lessonId).subscribe(
      (data) => {
        this.handleLessonResponse(data);
        this.quizResult = null;
        this.incorrectAnswers = [];
      },
      (error) => this.handleError(error)
    );
  }

  submitQuizAnswers() {
    if (Object.keys(this.quizAnswers).length === 0) {
      this.notificationService.notify(
        'Please answer at least one question before submitting the quiz.',
        'error'
      );
    } else {
      this.quizResult = this.quizService.calculateQuizResults(
        this.lesson.quiz!.questions,
        this.quizAnswers
      );
      this.incorrectAnswers = this.quizService.getIncorrectAnswers(
        this.lesson.quiz!.questions,
        this.quizAnswers
      );
    }
  }

  goToNextLesson() {
    const nextLessonId = this.navigationService.findNextLessonId(
      this.chapters,
      this.lesson.id
    );

    if (nextLessonId !== null) {
      this.lessonId = nextLessonId;
      this.courseService.getItemById(LESSON_API_ROUTE, nextLessonId).subscribe(
        (data) => {
          this.handleLessonResponse(data);
          this.quizResult = null;
          this.incorrectAnswers = [];
        },
        (error) => this.handleError(error)
      );
    }
  }

  goToPreviousLesson() {
    const prevLessonId = this.navigationService.findPrevLessonId(
      this.chapters,
      this.lesson.id
    );

    if (prevLessonId !== null) {
      this.lessonId = prevLessonId;
      this.courseService.getItemById(LESSON_API_ROUTE, prevLessonId).subscribe(
        (data) => {
          this.handleLessonResponse(data);
          this.quizResult = null;
        },
        (error) => this.handleError(error)
      );
    }
  }

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

  getTotalHoursCount() {
    return this.chapters.reduce((sum, chapter) => sum + chapter.noOfHours, 0);
  }

  getTotalLessonCount() {
    return this.chapters.reduce((sum, chapter) => sum + chapter.noOfLessons, 0);
  }

  retryQuiz() {
    this.quizResult = null;
    this.quizAnswers = {};
  }

  handleChaptersResponse(response: APIResponseVM) {
    this.handleAPIResponse(response, (items: Chapter[]) => {
      items.forEach((chapter) => {
        chapter.open = false;
        chapter.lessons.forEach((lesson) => {
          lesson.type = mapEnumValue(LessonType, lesson.type);
        });
      });
      this.chapters = items;
      this.totalHoursCount = this.getTotalHoursCount();
      this.totalLessonCount = this.getTotalLessonCount();

      this.firstLessonId = this.chapters[0].lessons[0].id;
      this.lastLessonId =
        this.chapters[this.chapters.length - 1].lessons[
          this.chapters[this.chapters.length - 1].lessons.length - 1
        ].id;

      console.log(this.firstLessonId);
      console.log(this.lastLessonId);
    });
  }

  handleLessonResponse(response: APIResponseVM) {
    this.handleAPIResponse(response, (items: Lesson[]) => {
      this.lesson = items[0];
    });
  }

  handleAPIResponse<T>(response: APIResponseVM, handler: (items: T[]) => void) {
    if (!response.success) {
      this.errorMessage =
        response.message || 'An error occurred while fetching data.';
      this.loading = false;
      return;
    }

    if (!Array.isArray(response.items) || response.items.length === 0) {
      this.errorMessage = 'No data available.';
      this.loading = false;
      return;
    }

    handler(response.items);
    this.loading = false;
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    this.errorMessage =
      error.status === 404
        ? 'The requested data could not be found.'
        : error.status === 500
        ? 'There was a problem with the server. Please try again later.'
        : 'An error occurred while loading the data. Please try again later.';
    this.loading = false;
  }
}
