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

  saveAttempted: boolean = false;
  quizValid: boolean = true;
  touchedFields: any = {};

  errorMessages: any = {
    quizTitle: 'Please enter a title with at least five characters.',
    quizDescription: 'Please enter a description with at least 10 characters.',
    questionText: 'Please enter a question with at least 10 characters.',
    questionChoices: 'Each question should have at least two options.',
    correctAnswer: 'Please choose a valid answer.',
    wordLength: 'Each word should be up to 20 characters long.',
    minimumQuestions: 'Please add at least one question.',
    emptyQuestionText: 'Please provide a question text.',
    uniqueChoices: 'Please ensure all choices are unique.',
    minimumChoices: 'Each question should have at least two options.',
    chooseAnswer: 'Please select an answer.',
    validAnswer: 'The correct answer must be one of the provided options.',
    generalValidation: 'Please address the validation errors before saving.',
  };

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
  }

  onDeleteQuestion(index: number): void {
    if (this.editedQuiz.questions!.length > 1) {
      this.editedQuiz.questions?.splice(index, 1);
    } else {
      this.notificationService.notify(
        this.errorMessages.minimumQuestions,
        'error'
      );
    }
  }

  onAddChoice(question: QuizQuestion): void {
    if (question.choices.length < 4) {
      question.choices.push('');
      if (question.correctAnswer === null) {
        this.notificationService.notify(
          this.errorMessages.chooseAnswer,
          'error'
        );
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
    if (this.validateQuiz(this.editedQuiz)) {
      this.quizChange.emit(this.editedQuiz);
      this.save.emit(this.editedQuiz);
    } else {
      this.notificationService.notify(
        this.errorMessages.generalValidation,
        'error'
      );
    }
  }

  isInvalidQuizTitle(): boolean {
    return (
      (this.touchedFields.quizTitle || this.editMode) &&
      (!this.validateWordLength(this.editedQuiz.title) ||
        this.editedQuiz.title.length < 5)
    );
  }

  isInvalidQuizDescription(): boolean {
    return (
      (this.touchedFields.quizDescription || this.editMode) &&
      (!this.validateWordLength(this.editedQuiz.description) ||
        this.editedQuiz.description.length < 10)
    );
  }

  isInvalidQuestionText(question: QuizQuestion): boolean {
    return (
      (this.touchedFields['questionText_' + question.questionText] ||
        this.editMode) &&
      (!question.questionText || question.questionText.trim() === '')
    );
  }

  isInvalidQuestionChoices(question: QuizQuestion): boolean {
    return (
      (this.touchedFields['questionChoices_' + question.questionText] ||
        this.editMode) &&
      (question.choices.length < 2 ||
        question.choices.some((choice) => choice.trim() === ''))
    );
  }

  isInvalidCorrectAnswer(question: QuizQuestion): boolean {
    return (
      (this.touchedFields['correctAnswer_' + question.questionText] ||
        this.editMode) &&
      question.correctAnswer === null
    );
  }

  validateWordLength(input: string): boolean {
    const words = input.split(' ');

    for (let word of words) {
      if (word.length > 20) {
        return false;
      }
    }

    return true;
  }

  validateQuiz(quiz: Lesson): boolean {
    if (quiz.questions!.length === 0) {
      this.notificationService.notify(
        this.errorMessages.minimumQuestions,
        'error'
      );
      return false;
    }

    for (let question of quiz.questions!) {
      if (!question.questionText) {
        this.notificationService.notify(
          this.errorMessages.emptyQuestionText,
          'error'
        );
        return false;
      }

      const nonBlankChoices = question.choices.filter(
        (choice) => choice.trim() !== ''
      );

      const uniqueChoices = Array.from(
        new Set(
          nonBlankChoices.map((choice) => choice.replace(/\s+/g, ' ').trim())
        )
      );
      if (uniqueChoices.length !== nonBlankChoices.length) {
        this.notificationService.notify(
          this.errorMessages.uniqueChoices,
          'error'
        );
        return false;
      }

      if (nonBlankChoices.length < 2) {
        this.notificationService.notify(
          this.errorMessages.minimumChoices,
          'error'
        );
        return false;
      }

      if (!question.correctAnswer) {
        this.notificationService.notify(
          this.errorMessages.chooseAnswer,
          'error'
        );
        return false;
      }

      if (!nonBlankChoices.includes(question.correctAnswer!)) {
        this.notificationService.notify(
          this.errorMessages.validAnswer,
          'error'
        );
        return false;
      }
    }

    return true;
  }
}
