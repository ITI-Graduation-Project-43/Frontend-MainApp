import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  constructor(private notificationService: NotificationService) {}

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

  getVideoURL(file: File): string {
    return file ? URL.createObjectURL(file) : '';
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
    if (this.validateChapterName(this.newChapterName)) {
      const chapter: Chapter = {
        name: this.newChapterName.trim(),
        editMode: false,
        lessons: [],
      };
      this.chapters.push(chapter);
      this.showAddNewChapter = false;
      this.newChapterName = '';
    }
  }

  deleteChapter(index: number) {
    this.notificationService.notify(
      'You should have at least one chapter',
      'error'
    );
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

  updateChapterName(index: number) {
    const chapter = this.chapters[index];
    chapter.editMode = false;
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
        if (this.validateLesson(this.newArticles[chapterIndex])) {
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
        }
        break;
      case LessonType.Quiz:
        if (
          this.validateLesson(this.newQuizzes[chapterIndex]) &&
          this.validateQuiz(this.newQuizzes[chapterIndex])
        ) {
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
        }
        break;
      case LessonType.Video:
        if (
          this.validateLesson(this.newVideos[chapterIndex]) &&
          this.validateVideoFile(this.newVideos[chapterIndex].videoFile!)
        ) {
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
        }
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
  saveEditedLesson(chapterIndex: number, lessonIndex: number = 0) {
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

  // #region Add Quiz
  addQuestion(chapterIndex: number) {
    this.newQuizzes[chapterIndex].questions?.push({
      questionText: '',
      choices: ['', '', '', ''],
      correctAnswer: '',
    });
  }

  deleteQuestion(chapterIndex: number, questionIndex: number) {
    if (this.newQuizzes[chapterIndex].questions!.length > 1) {
      this.newQuizzes[chapterIndex].questions?.splice(questionIndex, 1);
    } else {
      this.notificationService.notify(
        'You should have at least one question',
        'error'
      );
    }
  }

  deleteChoice(
    chapterIndex: number,
    questionIndex: number,
    choiceIndex: number
  ) {
    this.newQuizzes[chapterIndex].questions![questionIndex].choices.splice(
      choiceIndex,
      1
    );
  }

  addChoice(chapterIndex: number, questionIndex: number) {
    const choices =
      this.newQuizzes[chapterIndex].questions![questionIndex].choices;
    if (choices.length < 4) {
      choices.push('');
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
    if (file && this.isValidFile(file)) {
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
        { questionText: '', choices: ['', '', '', ''], correctAnswer: '' },
      ],
      attachment: null,
    };
  }
  // #endregion
  // #region Validate inputs

  isValidFile(file: File): boolean {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.ms-excel',
      'application/zip',
      'application/text',
      'text/plain',
    ];
    return validTypes.includes(file.type);
  }

  validateChapterName(name: string): boolean {
    const regex = /^[A-Za-z0-9\s]*$/;

    if (
      !this.validateWordLength(name) ||
      name.length < 2 ||
      !regex.test(name) ||
      name.length > 40
    ) {
      alert(
        'Invalid chapter name. It should have at least two alphabets and at most 40 alphabets. Each word should be at most 20 letters long.'
      );
      return false;
    }

    return true;
  }

  validateLesson(lesson: Lesson): boolean {
    if (!this.validateWordLength(lesson.title) || lesson.title.length < 2) {
      alert('Invalid lesson title. It should have at least two alphabets.');
      return false;
    }

    if (
      !this.validateWordLength(lesson.description) ||
      lesson.description.length < 10
    ) {
      alert('Invalid description. It should have at least 10 characters.');
      return false;
    }

    if (
      lesson.type === LessonType.Article &&
      (!this.validateWordLength(lesson.content!) ||
        lesson.content!.length < 100)
    ) {
      alert('Invalid content. It should have at least 100 characters.');
      return false;
    }

    return true;
  }

  validateWordLength(input: string): boolean {
    const words = input.split(' ');

    for (let word of words) {
      if (word.length > 20) {
        alert('Each word must be at most 20 letters long.');
        return false;
      }
    }

    return true;
  }

  validateQuiz(quiz: Lesson): boolean {
    if (quiz.questions!.length === 0) {
      alert('The quiz must have at least one question.');
      return false;
    }

    for (let question of quiz.questions!) {
      if (!question.questionText) {
        alert('Every question must have a question text.');
        return false;
      }

      const nonBlankChoices = question.choices.filter(
        (choice) => choice.trim() !== ''
      );
      if (nonBlankChoices.length < 2) {
        alert('Every question must have at least two non-blank options.');
        return false;
      }

      if (!nonBlankChoices.includes(question.correctAnswer)) {
        alert('The correct answer must be one of the choices provided.');
        return false;
      }
    }

    return true;
  }

  validateVideoFile(file: File): boolean {
    const validType = file.type.startsWith('video/');
    if (!validType) {
      alert('Invalid video file. Only video files are allowed.');
      return false;
    }

    return true;
  }
  // #endregion
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
  //collapsed: boolean;
  content?: string;
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
  correctAnswer: string;
}
