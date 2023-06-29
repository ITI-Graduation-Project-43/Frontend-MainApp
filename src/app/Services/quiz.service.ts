import { Injectable } from '@angular/core';
import { Question } from '../Models/lesson';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  calculateQuizResults(
    questions: Question[],
    quizAnswers: { [questionId: number]: string }
  ) {
    let correct = 0;
    for (let question of questions) {
      let choiceMapping = {
        [question.choiceA]: 'A',
        [question.choiceB]: 'B',
        [question.choiceC]: 'C',
        [question.choiceD]: 'D',
      };
      if (
        choiceMapping[quizAnswers[question.id]]?.toLowerCase() ===
        question.correctAnswer?.toLowerCase()
      ) {
        correct++;
      }
    }
    return { correct, total: questions.length };
  }
  getIncorrectAnswers(
    questions: Question[],
    quizAnswers: { [questionId: number]: string }
  ) {
    let incorrectAnswers: number[] = [];
    for (let question of questions) {
      if (quizAnswers[question.id] !== question.correctAnswer) {
        incorrectAnswers.push(question.id);
      }
    }
    return incorrectAnswers;
  }
}
