import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';
import { NotificationService } from '../../../Shared/Services/notification.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent implements OnInit {
  @Input() chapterName: string = '';
  @Input() editMode: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();
  @Output() chapterNameChange = new EventEmitter<string>();

  saveAttempted: boolean = false;
  touchedFields: any = {};

  errorMessages = ERROR_MESSAGES;

  constructor(
    private notificationService: NotificationService,
    private chapterValidationService: ChapterValidationService
  ) {}
  ngOnInit() {}

  onSave(): void {
    this.saveAttempted = true;
    if (this.isChapterValid()) {
      this.save.emit(this.chapterName);
    } else {
      this.notificationService.notify(
        this.errorMessages.generalValidation,
        'error'
      );
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onChapterNameChange(): void {
    this.chapterNameChange.emit(this.chapterName);
  }

  isInvalidChapterTitle(): string | null {
    if (
      this.saveAttempted ||
      this.editMode ||
      this.touchedFields.chapterTitle
    ) {
      const fieldName = 'title';
      if (!this.chapterName) {
        return this.errorMessages.requiredField(fieldName);
      } else if (
        !this.chapterValidationService.validateSentenceLength(
          this.chapterName,
          5,
          100
        )
      ) {
        return this.errorMessages.sentenceLength(fieldName, 5, 100);
      } else if (
        !this.chapterValidationService.validateWordLength(this.chapterName)
      ) {
        return this.errorMessages.wordLength;
      }
    }
    return null;
  }

  isChapterValid(): boolean {
    if (this.isInvalidChapterTitle() !== null) {
      return false;
    }
    return true;
  }
}
