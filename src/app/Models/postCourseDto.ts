export interface PostCourseDto {
  instructorId: string;
  title: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  language: string;
  price: string;
  level: string;
  courseImage: string;
  learningItems: { title: string; description: string }[];
  enrollmentItems: { title: string }[];
  courseRequirements: { title: string; description: string }[];
}
