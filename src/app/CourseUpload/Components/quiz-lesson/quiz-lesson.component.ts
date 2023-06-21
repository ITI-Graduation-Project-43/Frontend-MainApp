import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from '../create-chapter-lesson/create-chapter-lesson.component';

@Component({
  selector: 'app-quiz-lesson',
  templateUrl: './quiz-lesson.component.html',
  styleUrls: ['./quiz-lesson.component.scss'],
})
export class QuizLessonComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() quiz: Lesson = {} as Lesson;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() addQuestion = new EventEmitter<void>();
  @Output() deleteQuestion = new EventEmitter<number>();
  @Output() addChoice = new EventEmitter<any>();
  @Output() deleteChoice = new EventEmitter<{ question: any; index: number }>();

  editedQuiz: Lesson = {} as Lesson;

  constructor() {}

  ngOnInit() {
    this.editedQuiz = JSON.parse(JSON.stringify(this.quiz));
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.quiz = JSON.parse(JSON.stringify(this.editedQuiz));
    this.save.emit(this.quiz);
  }

  onAddQuestion(): void {
    this.addQuestion.emit();
  }

  onDeleteQuestion(index: number): void {
    this.deleteQuestion.emit(index);
  }

  onAddChoice(question: any): void {
    this.addChoice.emit(question);
  }

  onDeleteChoice(question: any, index: number): void {
    this.deleteChoice.emit({ question, index });
  }
}
