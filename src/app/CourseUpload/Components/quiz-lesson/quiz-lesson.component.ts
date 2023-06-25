import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Lesson, Quiz, Question } from 'src/app/Models/courseChapter';

import { NotificationService } from '../../../Shared/Services/notification.service';
import { ChapterValidationService } from 'src/app/Services/validation/lesson-validation.services';
import { ERROR_MESSAGES } from '../../../Shared/Helper/error-messages';

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

  errorMessages = ERROR_MESSAGES;

  constructor(
    private notificationService: NotificationService,
    private chapterValidationService: ChapterValidationService
  ) {}

  ngOnInit() {
    this.editedQuiz = { ...this.quiz };
    if (!this.editedQuiz.quiz) {
      this.editedQuiz.quiz = {
        id: 0,
        lessonId: 0,
        questions: [
          {
            id: 0,
            quizId: 0,
            questionText: '',
            choices: ['', ''],
            correctAnswer: '',
          },
        ],
      };
    }
  }

  trackByFn(index: any) {
    return index;
  }

  onRadioChange(question: Question, choiceIndex: number): void {
    const questionIndex =
      this.editedQuiz.quiz!.questions?.indexOf(question) || 0;
    this.selectedRadioIndices[questionIndex] = choiceIndex;
    question.correctAnswer = question.choices[choiceIndex];
  }

  onAddQuestion(): void {
    this.editedQuiz.quiz!.questions?.push({
      id: 0,
      quizId: 0,
      questionText: '',
      choices: ['', '', '', ''],
      correctAnswer: '',
    });
  }

  onDeleteQuestion(index: number): void {
    if (this.editedQuiz.quiz!.questions.length > 1) {
      this.editedQuiz.quiz!.questions?.splice(index, 1);
    } else {
      this.notificationService.notify(
        this.errorMessages.minimumQuestions,
        'error'
      );
    }
  }

  onAddChoice(question: Question): void {
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

  onDeleteChoice(question: Question, choiceIndex: number): void {
    question.choices.splice(choiceIndex, 1);
    if (question.correctAnswer === question.choices[choiceIndex]) {
      question.correctAnswer = '';
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSave(): void {
    this.saveAttempted = true;
    if (this.isQuizValid()) {
      this.quizChange.emit(this.editedQuiz);
      this.save.emit(this.editedQuiz);
    } else {
      this.notificationService.notify(
        this.errorMessages.generalValidation,
        'error'
      );
    }
  }

  isInvalidQuizTitle(): string | null {
    if (this.touchedFields.quizTitle || this.editMode || this.saveAttempted) {
      const { title } = this.editedQuiz;
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

  isInvalidQuizDescription(): string | null {
    if (
      this.touchedFields.quizDescription ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { description } = this.editedQuiz;
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

  isInvalidQuestionText(question: Question): string | null {
    if (
      this.touchedFields['questionText_' + question.questionText] ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { questionText } = question;
      const fieldName = 'question text';
      if (!questionText) {
        return this.errorMessages.requiredField(fieldName);
      } else if (
        !this.chapterValidationService.validateSentenceLength(
          questionText,
          10,
          150
        )
      ) {
        return this.errorMessages.sentenceLength(fieldName, 10, 150);
      } else if (
        !this.chapterValidationService.validateWordLength(questionText)
      ) {
        return this.errorMessages.wordLength;
      }
    }
    return null;
  }

  isInvalidQuestionChoices(question: Question): string | null {
    if (
      this.touchedFields['questionChoices_' + question.questionText] ||
      this.editMode ||
      this.saveAttempted
    ) {
      if (!this.chapterValidationService.hasEnoughChoices(question.choices)) {
        return this.errorMessages.minimumChoices;
      }
    }
    return null;
  }

  isInvalidCorrectAnswer(question: Question): string | null {
    if (
      this.touchedFields['correctAnswer_' + question.questionText] ||
      this.editMode ||
      this.saveAttempted
    ) {
      if (!question.correctAnswer) {
        return this.errorMessages.chooseAnswer;
      }
    }
    return null;
  }

  isInvalidUniqueChoices(question: Question): string | null {
    if (
      this.touchedFields['uniqueChoices_' + question.questionText] ||
      this.editMode ||
      this.saveAttempted
    ) {
      if (!this.chapterValidationService.areChoicesUnique(question.choices)) {
        return this.errorMessages.uniqueChoices;
      }
    }
    return null;
  }

  isInvalidField(question: Question): boolean {
    return (
      !!this.isInvalidQuestionText(question) ||
      !!this.isInvalidQuestionChoices(question) ||
      !!this.isInvalidCorrectAnswer(question) ||
      !!this.isInvalidUniqueChoices(question)
    );
  }
  isInvalidQuizRequiredHours(): string | null {
    if (
      this.touchedFields.quizRequiredHours ||
      this.editMode ||
      this.saveAttempted
    ) {
      const { noOfHours } = this.editedQuiz;
      const fieldName = 'Required Hours';
      if (!noOfHours || noOfHours === 0) {
        return this.errorMessages.requiredField(fieldName);
      } else if (noOfHours > 6 || noOfHours <= 0) {
        return this.errorMessages.invalidRequiredHours;
      }
    }
    return null;
  }
  isQuizValid(): boolean {
    if (
      this.isInvalidQuizTitle() !== null ||
      this.isInvalidQuizDescription() !== null ||
      this.isInvalidQuizRequiredHours !== null
    ) {
      return false;
    }
    const { questions } = this.editedQuiz.quiz || {};
    if (questions!.length === 0) {
      this.notificationService.notify(
        this.errorMessages.minimumQuestions,
        'error'
      );
      return false;
    }

    for (let question of questions!) {
      if (this.isInvalidField(question)) {
        return false;
      }
    }

    return true;
  }
}
