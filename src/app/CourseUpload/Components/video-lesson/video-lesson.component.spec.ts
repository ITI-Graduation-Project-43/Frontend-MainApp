/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VideoLessonComponent } from './video-lesson.component';

describe('VideoLessonComponent', () => {
  let component: VideoLessonComponent;
  let fixture: ComponentFixture<VideoLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
