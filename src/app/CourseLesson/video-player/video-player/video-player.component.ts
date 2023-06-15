import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Renderer2,
  Input,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() videoSrc: string = '';
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  video!: HTMLVideoElement;
  progress: number = 0;
  progressTime: string = '00:00';
  currentTime: string = '00:00';
  duration: string = '00:00';
  videoVolume: number = 0.5;
  showSpeedOptions: boolean = false;
  playbackSpeeds: number[] = [2, 1.5, 1, 0.75, 0.5];
  currentSpeed: number = 1;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.video = this.videoPlayer.nativeElement;
    this.video.src = this.videoSrc;
    this.video.volume = this.videoVolume;
  }

  updateTimeline(event: MouseEvent): void {
    const width = this.videoPlayer.nativeElement.offsetWidth;
    const clickX = event.offsetX;
    const duration = this.video.duration;

    this.video.currentTime = (clickX / width) * duration;
  }
  skipTo(event: MouseEvent): void {
    const width = this.videoPlayer.nativeElement.offsetWidth;
    const clickX = event.offsetX;
    const duration = this.video.duration;

    this.video.currentTime = (clickX / width) * duration;
  }
  toggleVolume(): void {
    this.videoVolume = this.video.volume === 0 ? 1 : 0;
    this.video.volume = this.videoVolume;
  }
  skipBackward(): void {
    this.video.currentTime = Math.max(0, this.video.currentTime - 10);
  }
  togglePlayPause(): void {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }
  skipForward(): void {
    this.video.currentTime = Math.min(
      this.video.duration,
      this.video.currentTime + 10
    );
  }
  toggleSpeedOptions(): void {
    this.showSpeedOptions = !this.showSpeedOptions;
  }
  setSpeed(speed: number): void {
    this.currentSpeed = speed;
    this.video.playbackRate = speed;
  }
  togglePip(): void {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      this.video.requestPictureInPicture();
    }
  }
  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      this.video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  updateProgress(): void {
    this.progress = (this.video.currentTime / this.video.duration) * 100;
    this.progressTime = this.formatTime(this.video.currentTime);
    this.currentTime = this.formatTime(this.video.currentTime);
  }

  loadMetadata(): void {
    if (this.video.duration) {
      this.duration = this.formatTime(this.video.duration);
    }
  }

  private formatTime(time: number): string {
    // Format the time into 'mm:ss' format
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
