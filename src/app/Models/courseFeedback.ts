export interface CourseFeedback {
  courseName: string;
  studentName: string;
  studentImage: string;
  instructorId: string;
  instructorRating: number;
  courseRating: number;
  feedbackText: string;
}
export interface CreateCourseFeedback {
  id: number;
  courseId: string;
  studentId: string;
  instructorId: string;
  instructorRating: number;
  courseRating: number;
  feedbackText: string;
}
