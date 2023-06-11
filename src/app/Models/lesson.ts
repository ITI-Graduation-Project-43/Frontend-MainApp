export interface Lesson {
  id: number;
  title: string;
  description: string;
  type: number;
  noOfHours: number;
  isFree: boolean;
  chapterId: number;
  chapterTitle: string;
  courseId: number;
  courseName: string;
}
