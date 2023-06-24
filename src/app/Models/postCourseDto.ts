export interface PostCourseDto {
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  language: number;
  price: number;
  level: number;
  instructorId: string;
  categoryId: number;
  learningItems: LearningItem[];
  enrollmentItems: EnrollmentItem[];
  courseRequirements: CourseRequirement[];
}

export interface LearningItem {
  title: string;
  description: string;
}

export interface EnrollmentItem {
  description: string;
}

export interface CourseRequirement {
  title: string;
  description: string;
}
