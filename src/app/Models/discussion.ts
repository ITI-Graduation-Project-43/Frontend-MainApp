export interface Discussion {
  id: number;
  lessonId: number;
  userId: string;
  parentDiscussionId?: number;
  content: string;
  upvotes: number;
  datetime: Date;
  username: string;
  parentContent: string;
}
