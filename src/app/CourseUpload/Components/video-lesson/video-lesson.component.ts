import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Lesson } from 'src/app/Models/courseChapter';
import { NotificationService } from '../../../Shared/Services/notification.service';
import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';
@Component({
  selector: 'app-video-lesson',
  templateUrl: './video-lesson.component.html',
  styleUrls: ['./video-lesson.component.scss'],
})
export class VideoLessonComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() video: Lesson = {} as Lesson;

  @Output() videoChange = new EventEmitter<Lesson>();
  @Output() videoUrlChange = new EventEmitter<string | null>();
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedVideo: Lesson = {} as Lesson;
  videoUrl: string | null = null;

  saveAttempted: boolean = false;
  videoValid: boolean = true;
  touchedFields: any = {};

  errorMessages = ERROR_MESSAGES;

  constructor(
    private notificationService: NotificationService,
    private chapterValidationService: ChapterValidationService
  ) {}

  ngOnInit() {
    this.editedVideo = JSON.parse(JSON.stringify(this.video));
    if (this.editMode && this.video.video) {
      this.editedVideo.video = JSON.parse(JSON.stringify(this.video.video));
      if (this.editedVideo?.video?.videoFile) {
        this.videoUrl = URL.createObjectURL(this.editedVideo.video.videoFile);
      }
    }
  }

  onVideoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.editedVideo.video = { id: 0, lessonId: 0, videoFile: file };
      this.videoUrl = URL.createObjectURL(file);
      this.videoUrlChange.emit(this.videoUrl);
    }
  }

  onDeleteVideo(): void {
    this.videoUrl = null;
    this.editedVideo.video = undefined;
    this.videoUrlChange.emit(this.videoUrl);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.saveAttempted = true;
    if (this.isVideoValid()) {
      this.videoChange.emit(this.editedVideo);
      this.save.emit(this.editedVideo);
    } else {
      this.notificationService.notify(
        this.errorMessages.generalValidation,
        'error'
      );
    }
  }

  isInvalidVideoTitle(): string | null {
    if (this.touchedFields.videoTitle || this.editMode || this.saveAttempted) {
      const { title } = this.editedVideo;
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
  isInvalidVideoDescription(): string | null {
    if (
      this.touchedFields.videoDescription ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { description } = this.editedVideo;
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

  isInvalidVideoFile(): string | null {
    if (this.saveAttempted) {
      const { video } = this.editedVideo;
      const fieldName = 'video File';
      if (!video || !video.videoFile) {
        return this.errorMessages.requiredField(fieldName);
      } else if (
        !this.chapterValidationService.isValidVideoFile(video.videoFile)
      ) {
        return this.errorMessages.invalidVideoFileType;
      }
    }
    return null;
  }

  isVideoValid(): boolean {
    if (
      this.isInvalidVideoTitle() !== null ||
      this.isInvalidVideoDescription() !== null ||
      this.isInvalidVideoFile() !== null
    ) {
      return false;
    }
    return true;
  }
}
