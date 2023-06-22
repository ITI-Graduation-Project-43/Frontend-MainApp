import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from '../create-chapter-lesson/create-chapter-lesson.component';

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

  progress = 0;
  videoUrl: string | null = null;
  constructor() {}

  ngOnInit() {
    this.editedVideo = JSON.parse(JSON.stringify(this.video));
    if (this.editMode && this.video.videoFile) {
      this.editedVideo.videoFile = this.video.videoFile;
      if (this.editedVideo.videoFile) {
        this.videoUrl = URL.createObjectURL(this.editedVideo.videoFile);
      }
    }
  }

  onVideoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.editedVideo.videoFile = file;
      this.videoUrl = URL.createObjectURL(file);
      this.videoUrlChange.emit(this.videoUrl);
    }
  }

  onDeleteVideo(): void {
    this.videoUrl = null;
    this.editedVideo.videoFile = undefined;

    this.videoUrlChange.emit(this.videoUrl);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.videoChange.emit(this.editedVideo);
    this.save.emit(this.editedVideo);
  }
}
