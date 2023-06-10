export interface Chapter {
  id: number;
  courseId: number;
  title: string;
  noOfLessons: number;
  noOfHours: number;
  open: boolean;
  lessons: ChapterLesson[];
}

export interface ChapterLesson {
  id: number;
  title: string;
  description: string;
  type: any;
  noOfHours: number;
  isFree: boolean;
}
