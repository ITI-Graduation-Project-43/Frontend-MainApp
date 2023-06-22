/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizLessonComponent } from './quiz-lesson.component';

describe('QuizLessonComponent', () => {
  let component: QuizLessonComponent;
  let fixture: ComponentFixture<QuizLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
