import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Lesson,
  QuizQuestion,
} from '../create-chapter-lesson/create-chapter-lesson.component';
import { NotificationService } from '../../../Shared/Services/notification.service';

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

  @Output() quizChange = new EventEmitter<Lesson>();

  editedQuiz: Lesson = {} as Lesson;
  selectedRadioIndices: number[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.editedQuiz = JSON.parse(JSON.stringify(this.quiz));
    if (!this.editedQuiz.questions) {
      this.editedQuiz.questions = [
        {
          questionText: '',
          choices: ['', '', '', ''],
          correctAnswer: null,
        },
      ];
    }
  }

  trackByFn(index: any) {
    return index;
  }

  onRadioChange(question: QuizQuestion, choiceIndex: number): void {
    const questionIndex = this.editedQuiz.questions?.indexOf(question) || 0;
    this.selectedRadioIndices[questionIndex] = choiceIndex;
    question.correctAnswer = question.choices[choiceIndex];
  }

  onAddQuestion(): void {
    this.editedQuiz.questions?.push({
      questionText: '',
      choices: ['', '', '', ''],
      correctAnswer: null,
    });
    this.selectedRadioIndices.push(0);
  }

  onDeleteQuestion(index: number): void {
    if (this.editedQuiz.questions!.length > 1) {
      this.editedQuiz.questions?.splice(index, 1);
    } else {
      this.notificationService.notify(
        'You should have at least one question',
        'error'
      );
    }
  }

  onAddChoice(question: QuizQuestion): void {
    if (question.choices.length < 4) {
      question.choices.push('');
      if (question.correctAnswer === null) {
        this.notificationService.notify(
          'Please make sure to choose an answer',
          'error'
        );
        question.correctAnswer = question.choices[0];
      }
    }
  }

  onDeleteChoice(question: QuizQuestion, choiceIndex: number): void {
    question.choices.splice(choiceIndex, 1);
    if (question.correctAnswer === question.choices[choiceIndex]) {
      question.correctAnswer = null;
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.quizChange.emit(this.editedQuiz);
    this.save.emit(this.editedQuiz);
  }
}
