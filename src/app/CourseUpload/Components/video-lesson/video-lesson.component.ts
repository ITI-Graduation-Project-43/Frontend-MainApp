import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Lesson } from 'src/app/Models/courseChapter';
import { NotificationService } from '../../../Shared/Services/notification.service';
import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';
import { UploadService } from 'src/app/Shared/Services/upload.service';
@Component({
  selector: 'app-video-lesson',
  templateUrl: './video-lesson.component.html',
  styleUrls: ['./video-lesson.component.scss'],
})
export class VideoLessonComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() video: Lesson = {} as Lesson;

  @Output() videoChange = new EventEmitter<Lesson>();
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedVideo: Lesson = {} as Lesson;

  saveAttempted: boolean = false;
  videoValid: boolean = true;
  touchedFields: any = {};

  errorMessages = ERROR_MESSAGES;
  uploadError: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private chapterValidationService: ChapterValidationService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.editedVideo = JSON.parse(JSON.stringify(this.video));
  }
  async onVideoSelected(event: any): Promise<void> {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!this.chapterValidationService.isValidVideoFile(file)) {
        this.notificationService.notify(
          this.errorMessages.invalidVideoFileType,
          'error'
        );
      }
      this.uploadService.uploadFile(file, 'Video').subscribe(
        (response) => {
          if (response.success) {
            this.editedVideo.video = {
              id: 0,
              lessonId: 0,
              videoUrl: (response.items[0] as string) || null,
            };
            this.uploadError = null;
          } else {
            this.uploadError =
              'Upload failed, please try again 🥺' || response.message;
          }
        },
        (error) => {
          this.uploadError = error;
        }
      );
    }
  }
  onDeleteVideo(): void {
    if (this.editedVideo.video && this.editedVideo.video!.videoUrl) {
      const fileUrl = this.editedVideo.video.videoUrl;

      this.uploadService.deleteFile(fileUrl, 'Video').subscribe(
        (response) => {
          if (response.success) {
            this.editedVideo.video!.videoUrl = null;
            this.editedVideo.video = undefined;
            this.notificationService.notify('video deleted successfully');
          } else {
            this.notificationService.notify(response.message, 'error');
          }
        },
        (error) => {
          this.notificationService.notify('Failed to delete video', 'error');
        }
      );
    }
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

  isVideoValid(): boolean {
    if (
      this.isInvalidVideoTitle() !== null ||
      this.isInvalidVideoDescription() !== null ||
      this.editedVideo.video?.videoUrl == null
    ) {
      return false;
    }
    return true;
  }
}
