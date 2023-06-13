export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: string;
  title: string;
  description: string;
  noOfCources: number;
  noOfStudents: number;
  noOfCourses: number;
  avgRating: number;
  noOfRating: number;
  createdAt: Date;
  updatedAt: Date;
  accounts: Account;
  courses: CourseInstructor[];
}

export interface Account {
  GitHub: string;
  Linkedin: string;
  Twitter: string;
}

export interface CourseInstructor {
  title: string;
  description: string;
  NoOfStudents: Number;
  Price: Number;
}
