export interface courseStudents {
  courseId: number;
  price: number;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl: string;
  courseAvgReview: number;
  courseNoOfStudents: number;
  courseDiscount?: number;
  courseCategoryName: string;
  instructorId: string;
  instructorFirstName: string;
  instructorLastName: string;
  instructorProfilePicture: string;
  student: CustomStudent[];
}

export interface CustomStudent {
  studentId: string;
  studentFirstName: string;
  studentLastName: string;
  studentProfilePicture?: string;
}
