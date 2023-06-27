import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';
import {
  Chapter,
  CreateChapterDto,
  CreateLessonDto,
  Lesson,
} from 'src/app/Models/courseChapter';
import { LessonType } from 'src/app/Models/Enums/LessonType';
import { FileType } from 'src/app/Models/Enums/FileType';
import { UploadService } from 'src/app/Shared/Services/upload.service';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
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

  uploadError: string | null = null;
  uploadingToDb: boolean = false;
  errorMessages = ERROR_MESSAGES;

  constructor(
    private notificationService: NotificationService,
    private chapterValidationService: ChapterValidationService,
    private router: Router,
    private uploadService: UploadService,
    private apiService: APIService
  ) {}

  ngOnInit() {
    document.querySelector(".app-header")?.classList.remove("dark-background")

    const storedChapters = localStorage.getItem('chapters');
    if (storedChapters) {
      this.chapters = JSON.parse(storedChapters);
    } else {
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
  }

  submitCourse() {
    const notificationService = this.notificationService;

    if (this.chapters.length < 1) {
      notificationService.notify(
        'You should have at least one chapter',
        'error'
      );
      return;
    }

    for (const chapter of this.chapters) {
      if (chapter.lessons.length < 1) {
        notificationService.notify(
          'You should have at least one lesson in the chapter',
          'error'
        );
        return;
      }

      for (const lesson of chapter.lessons) {
        if (lesson.type === LessonType.Article) {
          if (
            !lesson.article ||
            !lesson.article.content ||
            lesson.article.content.length < 100
          ) {
            notificationService.notify(
              'Please make sure to fill article data and enter valid content',
              'error'
            );
            return;
          }
        }

        if (lesson.type === LessonType.Video) {
          if (
            !lesson.video ||
            !lesson.video.videoUrl ||
            lesson.video.videoUrl == ''
          ) {
            notificationService.notify(
              'Please make sure to fill video data and upload a video file',
              'error'
            );
            return;
          }
        }

        if (lesson.type === LessonType.Quiz) {
          if (
            !lesson.quiz ||
            !lesson.quiz.questions ||
            lesson.quiz.questions.length < 1
          ) {
            notificationService.notify(
              'Please make sure to fill quiz data and enter at least one question',
              'error'
            );
            return;
          }

          for (const question of lesson.quiz.questions) {
            if (!question.questionText || question.questionText.length < 10) {
              notificationService.notify('Question text is too short', 'error');
              return;
            }

            if (
              !question.choices ||
              question.choices.length < 2 ||
              question.choices.length > 4 ||
              !question.choices[0] ||
              !question.choices[1]
            ) {
              notificationService.notify(
                'Each question must have at least two choices',
                'error'
              );
              return;
            }

            if (
              !question.correctAnswer ||
              !question.choices.includes(question.correctAnswer)
            ) {
              notificationService.notify(
                'Please select a correct answer for each question',
                'error'
              );
              return;
            }
          }
        }
      }
    }

    const chapterDtos: CreateChapterDto[] = this.chapters.map((chapter) => {
      const lessonDto: CreateLessonDto[] = chapter.lessons.map((lesson) => {
        const lessonDto: CreateLessonDto = {
          id: lesson.id,
          chapterId: lesson.chapterId,
          title: lesson.title,
          description: lesson.description,
          noOfHours: lesson.noOfHours,
          type: lesson.type,
          attachment: lesson.attachment
            ? {
                id: lesson.attachment.id,
                lessonId: lesson.attachment.lessonId,
                attachmentUrl: lesson.attachment.attachmentUrl,
                attachmentName: lesson.attachment.attachmentName,
                attachmentType: lesson.attachment.attachmentType,
                attachmentSize: lesson.attachment.attachmentSize,
              }
            : null,
          article: lesson.article
            ? {
                id: lesson.article.id,
                lessonId: lesson.article.lessonId,
                content: lesson.article.content,
              }
            : null,
          quiz: lesson.quiz
            ? {
                id: lesson.quiz.id,
                lessonId: lesson.quiz.lessonId,
                questions: lesson.quiz.questions.map((question) => {
                  return {
                    id: question.id,
                    quizId: question.quizId,
                    questionText: question.questionText,
                    choiceA: question.choices[0],
                    choiceB: question.choices[1],
                    choiceC: question.choices[2] || '',
                    choiceD: question.choices[3] || '',
                    correctAnswer: String.fromCharCode(
                      65 + question.choices.indexOf(question.correctAnswer)
                    ),
                  };
                }),
              }
            : null,
          video: lesson.video
            ? {
                id: lesson.video.id,
                lessonId: lesson.video.lessonId,
                videoUrl: lesson.video.videoUrl,
              }
            : null,
        };

        return lessonDto;
      });

      const chapterDto: CreateChapterDto = {
        id: chapter.id,
        courseId: chapter.courseId,
        title: chapter.title,
        lessons: lessonDto,
      };

      return chapterDto;
    });

    this.uploadingToDb = true;

    const storedCourse = localStorage.getItem('CreatedCourse');
    let postCourseDto;

    if (!storedCourse) {
      this.backTocreateCourse();
      this.uploadingToDb = false;
      return;
    }

    postCourseDto = JSON.parse(storedCourse);

    this.apiService.addItem('Course', postCourseDto).subscribe(
      (response: APIResponseVM) => {
        if (response.success) {
          localStorage.removeItem('CreatedCourse');
          const courseId = response.items[0].id;
          this.apiService
            .addItem(`Chapter/ChapterLesson/${courseId}`, chapterDtos)
            .subscribe(
              (chapterResponse: APIResponseVM) => {
                if (chapterResponse.success) {
                  localStorage.removeItem('chapters');
                  this.router.navigate(['/createCourse/step3']);
                } else {
                  this.notificationService.notify(
                    'There was an error uploading the chapters. Please try again later.'
                  );
                }
                this.uploadingToDb = false;
              },
              (error) => {
                console.log(error);
                this.notificationService.notify(
                  'There was an error uploading the chapters. Please try again later.'
                );
                this.uploadingToDb = false;
              }
            );
        } else {
          this.notificationService.notify(
            'There was an error creating the course. Please try again later.'
          );
          this.uploadingToDb = false;
        }
      },
      (error) => {
        console.log(error);
        this.notificationService.notify(
          'There was an error creating the course. Please try again later.'
        );
        this.uploadingToDb = false;
      }
    );
  }

  backTocreateCourse() {
    localStorage.setItem('chapters', JSON.stringify(this.chapters));
    this.router.navigate(['/createCourse/step1']);
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
        this.chapters[chapterIndex].lessons.push(newLesson);
        this.showAddNewLesson[chapterIndex] = false;
        this.toggleAddLessonOptions(chapterIndex);

        break;
      case LessonType.Quiz:
        newLesson = { ...this.newQuizzes[chapterIndex] };
        this.chapters[chapterIndex].lessons.push(newLesson);
        this.showAddNewLesson[chapterIndex] = false;
        this.toggleAddLessonOptions(chapterIndex);
        break;
      case LessonType.Video:
        newLesson = { ...this.newVideos[chapterIndex] };
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

    const lesson = this.chapters[chapterIndex].lessons[lessonIndex];
    let fileType: string = '';

    if (lesson.attachment?.attachmentUrl) {
      fileType = 'attachment';
    } else if (lesson.video && lesson.video.videoUrl) {
      fileType = 'video';
    }

    if (fileType) {
      const fileUrl =
        lesson.attachment?.attachmentUrl || lesson.video?.videoUrl;

      this.uploadService.deleteFile(fileUrl as string, fileType).subscribe(
        (response) => {
          if (response.success) {
            this.chapters[chapterIndex].lessons.splice(lessonIndex, 1);
            this.notificationService.notify('File deleted successfully');
          } else {
            this.notificationService.notify(response.message, 'error');
          }
        },
        (error) => {
          this.notificationService.notify('Failed to delete file', 'error');
        }
      );
    } else {
      this.chapters[chapterIndex].lessons.splice(lessonIndex, 1);
    }
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

  async onFileSelected(
    event: any,
    chapterIndex: number,
    lessonIndex: number
  ): Promise<void> {
    const file: File = event.target.files[0];
    if (file && this.chapterValidationService.isValidFile(file)) {
      this.uploadService.uploadFile(file, 'Attachment').subscribe(
        (response) => {
          if (response.success) {
            const fileType = this.getFileTypeFromExtension(file.name);
            this.chapters[chapterIndex].lessons[lessonIndex].attachment = {
              id: 0,
              lessonId: 0,
              attachmentUrl: (response.items[0] as string) || null,
              attachmentName: file.name,
              attachmentType: fileType,
              attachmentSize: this.getFileSize(file.size),
            };
            this.uploadError = null;
            console.log(this.chapters[chapterIndex].lessons[lessonIndex]);
            this.notificationService.notify('File uploaded successfully');
          } else {
            this.uploadError =
              'Upload failed, please try again 🥺' || response.message;
          }
        },
        (error) => {
          this.uploadError = error;
        }
      );
    } else {
      this.notificationService.notify(
        this.errorMessages.invalidAttachmentFileType,
        'error'
      );
    }
  }

  getFileTypeFromExtension(fileName: string): string {
    const extension = this.getFileExtension(fileName);
    switch (extension) {
      case '.pdf':
        return 'PDF';
      case '.doc':
      case '.docx':
        return 'Word';
      case '.xls':
      case '.xlsx':
        return 'Excel';
      case '.ppt':
      case '.pptx':
        return 'PowerPoint';
      case '.txt':
        return 'Text';
      default:
        return 'Other';
    }
  }

  getFileExtension(fileName: string): string {
    return fileName.substr(fileName.lastIndexOf('.')).toLowerCase();
  }

  getFileSize(sizeInBytes: number): string {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (sizeInBytes >= gigabyte) {
      return (sizeInBytes / gigabyte).toFixed(2) + ' GB';
    } else if (sizeInBytes >= megabyte) {
      return (sizeInBytes / megabyte).toFixed(2) + ' MB';
    } else if (sizeInBytes >= kilobyte) {
      return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
    } else {
      return sizeInBytes.toString() + ' Bytes';
    }
  }

  deleteFile(chapterIndex: number, lessonIndex: number): void {
    const lesson = this.chapters[chapterIndex].lessons[lessonIndex];
    if (lesson && lesson.attachment && lesson.attachment.attachmentUrl) {
      const fileUrl = lesson.attachment.attachmentUrl;

      this.uploadService.deleteFile(fileUrl, 'Attachment').subscribe(
        (response) => {
          if (response.success) {
            this.chapters[chapterIndex].lessons[lessonIndex].attachment = null;
            this.notificationService.notify('File deleted successfully');
          } else {
            this.notificationService.notify(response.message, 'error');
          }
        },
        (error) => {
          this.notificationService.notify('Failed to delete file', 'error');
        }
      );
    }
  }

  // #endregion

  // #region Lesson helper fn
  createNewArticleLesson(): Lesson {
    return {
      id: 0,
      chapterId: 0,
      title: '',
      description: '',
      noOfHours: 0.1,
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
      noOfHours: 0.1,
      type: this.videoType,
      video: {
        id: 0,
        lessonId: 0,
        videoUrl: '',
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
      noOfHours: 0.1,
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
