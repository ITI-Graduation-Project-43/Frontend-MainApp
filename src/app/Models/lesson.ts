import { LessonType } from './Enums/LessonType';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  type: LessonType;
  article?: Article;
  quiz?: Quiz;
  video?: Video;
}

export interface Article {
  id: number;
  content: string;
}

export interface Quiz {
  id: number;
  questions: Question[];
}

export interface Video {
  id: number;
  videoUrl: string;
}

export interface Question {
  id: number;
  questionText: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: string;
}
