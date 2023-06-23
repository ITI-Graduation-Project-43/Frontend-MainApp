import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';
@Component({
  selector: 'app-create-chapter-lesson',
  templateUrl: './create-chapter-lesson.component.html',
  styleUrls: ['./create-chapter-lesson.component.scss'],
})
export class CreateChapterLessonComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  chapters: Chapter[] = [];
  articleType = LessonType.Article;
  videoType = LessonType.Video;
  quizType = LessonType.Quiz;

  newArticles: Lesson[] = [];
  newVideos: Lesson[] = [];
  newQuizzes: Lesson[] = [];

  showAddNewChapter: boolean = false;
  newChapterName: string = '';

  editLessonMode = false;
  addLessonChapterIndex: number = -1;
  editLessonIndex: number | null = null;

  showAddNewLesson: boolean[] = [];
  showAddLessonOptions: boolean[] = [];
  newLessonType: string[] | null[] = [];

  isCollapsed: boolean[] = [];
  isChapterCollapsed: boolean[] = [];

  videoURL: string | null = null;

  saveAttempted: boolean = false;
  touchedFields: any = {};

  errorMessages = ERROR_MESSAGES;

  constructor(
    private notificationService: NotificationService,
    private chapterValidationService: ChapterValidationService
  ) {}

  ngOnInit() {
    const defaultChapter: Chapter = {
      name: 'Introduction',
      editMode: false,
      lessons: [],
    };
    this.chapters.push(defaultChapter);
    this.newLessonType = new Array(this.chapters.length).fill(null);
    this.showAddNewLesson = new Array(this.chapters.length).fill(false);
    this.showAddLessonOptions = new Array(this.chapters.length).fill(false);
  }

  handleVideoUrlChange(newUrl: string | null) {
    this.videoURL = newUrl;
  }

  getVideoURL(): string {
    return this.videoURL || '';
  }

  // #region Chapter fns
  addChapter() {
    this.showAddNewChapter = true;
  }

  cancelAddChapter() {
    this.showAddNewChapter = false;
    this.newChapterName = '';
  }

  saveChapter() {
    const chapter: Chapter = {
      name: this.newChapterName.trim(),
      editMode: false,
      lessons: [],
    };
    this.chapters.push(chapter);
    this.showAddNewChapter = false;
    this.newChapterName = '';
  }
  updateChapterName(index: number, newName: string): void {
    const chapter = this.chapters[index];
    chapter.name = newName;
    chapter.editMode = false;
  }
  deleteChapter(index: number) {
    if (this.chapters.length > 1) {
      this.chapters.splice(index, 1);
    } else {
      this.notificationService.notify(
        'You should have at least one chapter',
        'error'
      );
    }
  }

  drop(event: CdkDragDrop<Chapter[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
    }
  }
  toggleEditMode(index: number) {
    this.chapters[index].editMode = !this.chapters[index].editMode;
  }

  toggleChapterCollapse(ChapterIndex: number) {
    this.isChapterCollapsed[ChapterIndex] =
      !this.isChapterCollapsed[ChapterIndex];
  }
  // #endregion

  // #region Lesson fns
  saveLesson(chapterIndex: number, type: LessonType) {
    let newLesson: Lesson;
    switch (type) {
      case LessonType.Article:
        newLesson = { ...this.newArticles[chapterIndex] };
        this.newArticles[chapterIndex] = {
          title: '',
          description: '',
          type: this.articleType,
          content: '',
        };
        this.chapters[chapterIndex].lessons.push(newLesson);
        this.showAddNewLesson[chapterIndex] = false;
        this.toggleAddLessonOptions(chapterIndex);

        break;
      case LessonType.Quiz:
        newLesson = { ...this.newQuizzes[chapterIndex] };
        this.newQuizzes[chapterIndex] = {
          title: '',
          description: '',
          type: this.quizType,
          questions: [
            {
              questionText: '',
              choices: ['', '', '', ''],
              correctAnswer: '',
            },
          ],
        };
        this.chapters[chapterIndex].lessons.push(newLesson);
        this.showAddNewLesson[chapterIndex] = false;
        this.toggleAddLessonOptions(chapterIndex);
        break;
      case LessonType.Video:
        newLesson = { ...this.newVideos[chapterIndex] };
        this.newVideos[chapterIndex] = {
          title: '',
          description: '',
          type: this.videoType,
          videoFile: new File([], ''),
        };
        this.chapters[chapterIndex].lessons.push(newLesson);
        this.showAddNewLesson[chapterIndex] = false;
        this.toggleAddLessonOptions(chapterIndex);
        break;
    }
  }
  cancelAddLesson(chapterIndex: number) {
    this.showAddLessonOptions[chapterIndex] = false;
    this.showAddNewLesson[chapterIndex] = false;
    this.newLessonType[chapterIndex] = null;
    this.addLessonChapterIndex = -1;
  }
  cancelEditLesson(chapterIndex: number, lessonIndex: number) {
    this.chapters[chapterIndex].lessons[lessonIndex].editMode = false;
    this.showAddNewLesson[chapterIndex] = false;
    this.toggleAddLessonOptions(chapterIndex);
  }

  saveEditedLesson(
    chapterIndex: number,
    lessonIndex: number,
    updatedLesson: Lesson
  ) {
    this.chapters[chapterIndex].lessons[lessonIndex] = updatedLesson;
    this.chapters[chapterIndex].lessons[lessonIndex].editMode = false;
  }
  editLesson(chapterIndex: number, lessonIndex: number) {
    this.chapters[chapterIndex].lessons[lessonIndex].editMode = true;
  }
  deleteLesson(chapterIndex: number, lessonIndex: number) {
    if (this.editLessonIndex === lessonIndex) {
      this.editLessonIndex = null;
    }
    this.chapters[chapterIndex].lessons.splice(lessonIndex, 1);
  }
  toggleCollapse(lessonIndex: number) {
    this.isCollapsed[lessonIndex] = !this.isCollapsed[lessonIndex];
  }

  toggleAddLessonOptions(chapterIndex: number) {
    this.showAddLessonOptions[chapterIndex] =
      !this.showAddLessonOptions[chapterIndex];

    if (!this.showAddLessonOptions[chapterIndex]) {
      this.showAddNewLesson[chapterIndex] = false;
      this.newLessonType[chapterIndex] = null;
    }
  }
  selectLessonType(index: number, type: string) {
    this.newLessonType[index] = type;
    this.showAddNewLesson[index] = true;
    this.addLessonChapterIndex = index;

    switch (type) {
      case 'Article':
        this.newArticles[index] = this.createNewArticleLesson();
        break;
      case 'Video':
        this.newVideos[index] = this.createNewVideoLesson();
        break;
      case 'Quiz':
        this.newQuizzes[index] = this.createNewQuizLesson();
        break;
    }
  }

  dropLesson(event: CdkDragDrop<Lesson[]>, chapterIndex: number): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(
        this.chapters[chapterIndex].lessons,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // #endregion

  // #region Attachment
  onFileInputClick(chapterIndex: number, lessonIndex: number): void {
    this.editLessonIndex = lessonIndex;
    this.addLessonChapterIndex = chapterIndex;
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any, chapterIndex: number, lessonIndex: number): void {
    const file: File = event.target.files[0];
    if (file && this.chapterValidationService.isValidFile(file)) {
      this.chapters[chapterIndex].lessons[lessonIndex].attachment = file;
    } else {
      alert('Invalid file. Only PDF, DOC and ZIP files are allowed.');
    }
  }

  deleteFile(chapterIndex: number, lessonIndex: number): void {
    this.chapters[chapterIndex].lessons[lessonIndex].attachment = null;
  }

  // #endregion

  // #region Lesson helper fn
  createNewArticleLesson(): Lesson {
    return {
      title: '',
      description: '',
      type: this.articleType,
      content: '',
      contentHTML: '',
      attachment: null,
    };
  }

  createNewVideoLesson(): Lesson {
    return {
      title: '',
      description: '',
      type: this.videoType,
      videoFile: new File([], ''),
      attachment: null,
    };
  }

  createNewQuizLesson(): Lesson {
    return {
      title: '',
      description: '',
      type: this.quizType,
      questions: [
        { questionText: '', choices: ['', '', '', ''], correctAnswer: null },
      ],
      attachment: null,
    };
  }
  // #endregion

  getChoiceIdentifier(idx: number): string {
    return String.fromCharCode('A'.charCodeAt(0) + idx);
  }
}

interface Chapter {
  name: string;
  editMode: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  description: string;
  type: LessonType;
  content?: string;
  contentHTML?: string;
  videoFile?: File;
  questions?: QuizQuestion[];
  attachment?: File | null;
  editMode?: boolean;
}
export enum LessonType {
  Article = 'Article',
  Video = 'Video',
  Quiz = 'Quiz',
}

export interface QuizQuestion {
  questionText: string;
  choices: string[];
  correctAnswer: string | null;
}
