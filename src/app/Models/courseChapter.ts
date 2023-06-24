import { FileType } from './Enums/FileType';
import { LessonType } from './Enums/LessonType';

export interface Chapter {
  id: number;
  courseId: number;
  title: string;
  lessons: Lesson[];
  editMode: boolean;
}

export interface Lesson {
  id: number;
  chapterId: number;
  title: string;
  description: string;
  type: LessonType;
  NoOfHours: number;
  attachment?: Attachment | null;
  article?: Article;
  quiz?: Quiz;
  video?: Video;
  editMode?: boolean;
}

export interface Article {
  id: number;
  lessonId: number;
  content: string;
}

export interface Video {
  id: number;
  lessonId: number;
  videoFile: File;
}

export interface Attachment {
  id: number;
  lessonId: number;
  fileData: File;
  fileType: FileType;
}

export interface Quiz {
  id: number;
  lessonId: number;
  questions: Question[];
}

export interface Question {
  id: number;
  quizId: number;
  questionText: string;
  choices: string[];
  correctAnswer: string;
}
