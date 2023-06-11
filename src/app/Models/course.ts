export interface Course {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  language: number;
  price: number;
  level: number;
  avgReview: number;
  noOfReviews: number;
  noOfStudents: number;
  discount: number;
  chapterCount: number;
  lessonCount: number;
  noOfVideos: number;
  noOfArticles: number;
  noOfAttachments: number;
  noOfHours: number;
  noOfQuizes: number;
  published: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  SubcategoryId: number;
  TopicId: number;
  categoryName: string;
  subCategoryName: string;
  topicName: string;
  instructorId: string;
  instructorName: string;
  instructorBio: string;
  instructorProfilePicture: string;
  instructorTitle: string;
  instructorDescription: string;
  instructorNoOfCourses: number;
  instructorNoOfStudents: number;
  instructorAvgRating: number;
  instructorNoOfRatings: number;
  chapters: CourseChapter[];
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

export interface CourseChapter {
  title: string;
  noOfLessons: number;
  noOfHours: number;
}
