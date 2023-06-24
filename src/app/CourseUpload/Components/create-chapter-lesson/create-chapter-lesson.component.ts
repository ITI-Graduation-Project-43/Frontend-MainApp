import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';
import { Chapter, Lesson } from 'src/app/Models/courseChapter';
import { LessonType } from 'src/app/Models/Enums/LessonType';
import { FileType } from 'src/app/Models/Enums/FileType';
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
  fileType = FileType;

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
      id: 0,
      courseId: 0,
      title: 'Introduction',
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
      id: 0,
      courseId: 0,
      title: this.newChapterName.trim(),
      editMode: false,
      lessons: [],
    };
    this.chapters.push(chapter);
    this.showAddNewChapter = false;
    this.newChapterName = '';
  }
  updateChapterName(index: number, newName: string): void {
    const chapter = this.chapters[index];
    chapter.title = newName;
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
        // this.newArticles[chapterIndex] = {
        //   title: '',
        //   description: '',
        //   type: this.articleType,
        //   content: '',
        // };
        this.chapters[chapterIndex].lessons.push(newLesson);
        this.showAddNewLesson[chapterIndex] = false;
        this.toggleAddLessonOptions(chapterIndex);

        break;
      case LessonType.Quiz:
        newLesson = { ...this.newQuizzes[chapterIndex] };
        // this.newQuizzes[chapterIndex] = {
        //   title: '',
        //   description: '',
        //   type: this.quizType,
        //   questions: [
        //     {
        //       questionText: '',
        //       choices: ['', '', '', ''],
        //       correctAnswer: '',
        //     },
        //   ],
        // };
        this.chapters[chapterIndex].lessons.push(newLesson);
        this.showAddNewLesson[chapterIndex] = false;
        this.toggleAddLessonOptions(chapterIndex);
        break;
      case LessonType.Video:
        newLesson = { ...this.newVideos[chapterIndex] };
        // this.newVideos[chapterIndex] = {
        //   title: '',
        //   description: '',
        //   type: this.videoType,
        //   videoFile: new File([], ''),
        // };
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
      const lesson = this.chapters[chapterIndex].lessons[lessonIndex];
      if (lesson && lesson.attachment) {
        lesson.attachment.fileData = file;
        lesson.attachment.fileType = this.getFileTypeFromExtension(file.name);
      } else {
        const fileType = this.getFileTypeFromExtension(file.name);
        this.chapters[chapterIndex].lessons[lessonIndex].attachment = {
          id: 0,
          lessonId: 0,
          fileData: file,
          fileType: fileType,
        };
      }
    } else {
      alert('Invalid file. Only PDF, DOC and ZIP files are allowed.');
    }
  }

  private getFileTypeFromExtension(fileName: string): FileType {
    const extension = fileName
      .substring(fileName.lastIndexOf('.') + 1)
      .toLowerCase();
    switch (extension) {
      case 'pdf':
        return FileType.PDF;
      case 'docx':
        return FileType.DOCX;
      case 'zip':
        return FileType.ZIP;
      default:
        return FileType.PDF;
    }
  }

  deleteFile(chapterIndex: number, lessonIndex: number): void {
    this.chapters[chapterIndex].lessons[lessonIndex].attachment = null;
  }

  // #endregion

  // #region Lesson helper fn
  createNewArticleLesson(): Lesson {
    return {
      id: 0,
      chapterId: 0,
      title: '',
      description: '',
      NoOfHours: 0,
      type: this.articleType,
      article: {
        id: 0,
        lessonId: 0,
        content: '',
      },
      attachment: null,
    };
  }

  createNewVideoLesson(): Lesson {
    return {
      id: 0,
      chapterId: 0,
      title: '',
      description: '',
      NoOfHours: 0,
      type: this.videoType,
      video: {
        id: 0,
        lessonId: 0,
        videoFile: new File([], ''),
      },
      attachment: null,
    };
  }

  createNewQuizLesson(): Lesson {
    return {
      id: 0,
      chapterId: 0,
      title: '',
      description: '',
      NoOfHours: 0,
      type: this.quizType,
      quiz: {
        id: 0,
        lessonId: 0,
        questions: [
          {
            id: 0,
            quizId: 0,
            questionText: '',
            choices: ['', '', '', ''],
            correctAnswer: '',
          },
        ],
      },
      attachment: null,
    };
  }
  // #endregion

  getChoiceIdentifier(idx: number): string {
    return String.fromCharCode('A'.charCodeAt(0) + idx);
  }
}
