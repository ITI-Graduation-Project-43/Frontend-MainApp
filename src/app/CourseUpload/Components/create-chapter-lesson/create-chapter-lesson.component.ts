import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-chapter-lesson',
  templateUrl: './create-chapter-lesson.component.html',
  styleUrls: ['./create-chapter-lesson.component.scss'],
})
export class CreateChapterLessonComponent implements OnInit {
  chapters: Chapter[] = [];
  showAddNewChapter: boolean = false;
  newChapterName: string = '';
  lessonToAddType: 'Video' | 'Quiz' | 'Article' | null = null;
  showAddLessonOptions: boolean = false;
  newLessonName = '';
  showAddNewLesson = false;
  newLessonType: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    const defaultChapter: Chapter = {
      name: 'Introduction',
      editMode: false,
      lessons: [],
    };
    this.chapters.push(defaultChapter);
  }

  addChapter() {
    this.showAddNewChapter = true;
  }

  cancelAddChapter() {
    this.showAddNewChapter = false;
    this.newChapterName = '';
  }

  saveChapter() {
    if (this.newChapterName.trim() !== '') {
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

  // addLesson(index: number, type: 'Video' | 'Quiz' | 'Article') {
  //   this.lessonToAddType = type;
  //   const lesson: Lesson = {
  //     name: '',
  //     type: this.lessonToAddType,
  //   };
  //   this.chapters[index].lessons.push(lesson);
  // }

  saveLesson(chapterIndex: number) {
    const newLesson: Lesson = {
      name: this.newLessonName,
      type: this.newLessonType,
      description: '',
      collapsed: false,
    };
    this.chapters[chapterIndex].lessons.push(newLesson);
    this.newLessonName = '';
    this.showAddNewLesson = false;
  }
  cancelAddLesson() {
    this.showAddNewLesson = false;
  }

  deleteLesson(chapterIndex: number, lessonIndex: number) {
    this.chapters[chapterIndex].lessons.splice(lessonIndex, 1);
  }
}

interface Chapter {
  name: string;
  editMode: boolean;
  lessons: Lesson[];
}

interface Lesson {
  name: string;
  type: string;
  description: string;
  collapsed: boolean;
}
