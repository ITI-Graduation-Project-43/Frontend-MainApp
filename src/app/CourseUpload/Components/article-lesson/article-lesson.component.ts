import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'quill-emoji';

import { Lesson } from 'src/app/Models/courseChapter';
import { NotificationService } from '../../../Shared/Services/notification.service';
import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';
@Component({
  selector: 'app-article-lesson',
  templateUrl: './article-lesson.component.html',
  styleUrls: ['./article-lesson.component.scss'],
})
export class ArticleLessonComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() article: Lesson = {} as Lesson;
  @Output() articleChange = new EventEmitter<Lesson>();
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  public editedArticle: Lesson = {} as Lesson;

  saveAttempted: boolean = false;
  touchedFields: any = {};
  quillConfig: any = {};
  isBold: boolean = false;
  isItalic: boolean = false;

  errorMessages = ERROR_MESSAGES;

  constructor(
    private notificationService: NotificationService,
    private chapterValidationService: ChapterValidationService
  ) {
    this.quillConfig = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],

          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }],
          [{ align: [] }],

          ['link', 'image', 'video'],
          ['emoji'],
        ],
        handlers: { emoji: function () {} },
      },
    };
  }

  ngOnInit() {
    this.editedArticle = JSON.parse(JSON.stringify(this.article));
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.saveAttempted = true;
    if (this.isArticleValid()) {
      this.articleChange.emit(this.editedArticle);
      this.save.emit(this.editedArticle);
    } else {
      this.notificationService.notify(
        this.errorMessages.generalValidation,
        'error'
      );
    }
  }

  blur($event: any) {
    this.touchedFields.articleContent = true;
  }

  // #region Validation

  isInvalidArticleTitle(): string | null {
    if (
      this.touchedFields.articleTitle ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { title } = this.editedArticle;
      const fieldName = 'title';
      if (!title) {
        return this.errorMessages.requiredField(fieldName);
      } else if (
        !this.chapterValidationService.validateSentenceLength(title, 5, 100)
      ) {
        return this.errorMessages.sentenceLength(fieldName, 5, 100);
      } else if (!this.chapterValidationService.validateWordLength(title)) {
        return this.errorMessages.wordLength;
      }
    }
    return null;
  }

  isInvalidArticleDescription(): string | null {
    if (
      this.touchedFields.articleDescription ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { description } = this.editedArticle;
      const fieldName = 'description';
      if (!description) {
        return this.errorMessages.requiredField(fieldName);
      } else if (
        !this.chapterValidationService.validateSentenceLength(
          description,
          10,
          500
        )
      ) {
        return this.errorMessages.sentenceLength(fieldName, 10, 500);
      } else if (
        !this.chapterValidationService.validateWordLength(description)
      ) {
        return this.errorMessages.wordLength;
      }
    }
    return null;
  }
  isInvalidArticleContent(): string | null {
    if (
      this.touchedFields.articleContent ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { content } = this.editedArticle.article || {};
      const fieldName = 'content';
      if (!content) {
        return this.errorMessages.requiredField(fieldName);
      } else if (
        !this.chapterValidationService.validateSentenceLength(content, 100)
      ) {
        return this.errorMessages.sentenceLength(fieldName, 100);
      }
    }
    return null;
  }
  isInvalidArticleRequiredHours(): string | null {
    if (
      this.touchedFields.articleRequiredHours ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { noOfHours } = this.editedArticle;
      const fieldName = 'Required Hours';
      if (!noOfHours || noOfHours === 0) {
        return this.errorMessages.requiredField(fieldName);
      } else if (noOfHours > 6 || noOfHours <= 0) {
        return this.errorMessages.invalidRequiredHours;
      }
    }
    return null;
  }
  isArticleValid(): boolean {
    if (
      this.isInvalidArticleTitle() !== null ||
      this.isInvalidArticleDescription() !== null ||
      this.isInvalidArticleContent() !== null ||
      this.isInvalidArticleRequiredHours !== null
    ) {
      return false;
    }
    return true;
  }

  //#endregion
}
