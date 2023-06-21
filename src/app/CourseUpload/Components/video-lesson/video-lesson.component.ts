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
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedVideo: Lesson = {} as Lesson;
  originalFile: File | undefined = undefined;

  progress = 0;
  videoUrl: string | null = null;

  constructor() {}

  ngOnInit() {
    // Deep copy the video data when the component is initialized
    this.editedVideo = JSON.parse(JSON.stringify(this.video));
    // Save the original file
    this.originalFile = this.video.videoFile;
    if (this.originalFile) {
      // Create a URL for the original file
      this.videoUrl = URL.createObjectURL(this.originalFile);
    }
  }

  getProgressBarColor(): string {
    return `linear-gradient(to right, #FDF6EB ${this.progress}%, transparent ${this.progress}%)`;
  }

  onVideoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.editedVideo.videoFile = file;
      this.originalFile = file;
      this.videoUrl = URL.createObjectURL(file);

      let interval = setInterval(() => {
        this.progress += 10;
        if (this.progress >= 100) {
          clearInterval(interval);
        }
      }, 500);
    }
  }

  onDeleteVideo(): void {
    this.videoUrl = null;
    this.editedVideo.videoFile = undefined;
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.video = JSON.parse(JSON.stringify(this.editedVideo));
    this.video.videoFile = this.editedVideo.videoFile;
    this.save.emit(this.video);
  }
}
