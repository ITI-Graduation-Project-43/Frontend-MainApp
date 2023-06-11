export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture?: string;
  numCourses: number;
  numWishlist: number;
  createdAt: Date;
  updatedAt: Date;
  accounts: Record<string, string>;
}
