import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from '../create-chapter-lesson/create-chapter-lesson.component';
@Component({
  selector: 'app-article-lesson',
  templateUrl: './article-lesson.component.html',
  styleUrls: ['./article-lesson.component.scss'],
})
export class ArticleLessonComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() article: Lesson = {} as Lesson;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.save.emit(this.article);
  }
}
