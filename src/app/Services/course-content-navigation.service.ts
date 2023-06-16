import { Injectable } from '@angular/core';

import { Chapter } from '../Models/chapter';

@Injectable({
  providedIn: 'root',
})
export class CourseContentNavigationService {
  constructor() {}

  findPrevLessonId(
    chapters: Chapter[],
    currentLessonId: number
  ): number | null {
    let currentLessonIndex: number = -1;
    let currentChapterIndex: number = -1;

    // Find the current lesson and chapter indices
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const index = chapter.lessons.findIndex(
        (lesson) => lesson.id === currentLessonId
      );
      if (index !== -1) {
        currentLessonIndex = index;
        currentChapterIndex = i;
        break;
      }
    }

    // If no matching lesson is found, return null
    if (currentLessonIndex === -1 || currentChapterIndex === -1) {
      return null;
    }

    // Find the previous lesson
    let prevLessonId: number | null = null;
    if (currentLessonIndex > 0) {
      // The previous lesson is in the same chapter
      prevLessonId =
        chapters[currentChapterIndex].lessons[currentLessonIndex - 1].id;
    } else if (currentChapterIndex > 0) {
      // The previous lesson is in the previous chapter (last lesson of the previous chapter)
      const prevChapter = chapters[currentChapterIndex - 1];
      prevLessonId = prevChapter.lessons[prevChapter.lessons.length - 1].id;
    }

    return prevLessonId;
  }
  findNextLessonId(
    chapters: Chapter[],
    currentLessonId: number
  ): number | null {
    let currentLessonIndex: number = -1;
    let currentChapterIndex: number = -1;

    // Find the current lesson and chapter indices
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const index = chapter.lessons.findIndex(
        (lesson) => lesson.id === currentLessonId
      );
      if (index !== -1) {
        currentLessonIndex = index;
        currentChapterIndex = i;
        break;
      }
    }

    // If no matching lesson is found, return null
    if (currentLessonIndex === -1 || currentChapterIndex === -1) {
      return null;
    }

    // Find the next lesson
    let nextLessonId: number | null = null;
    if (currentLessonIndex < chapters[currentChapterIndex].lessons.length - 1) {
      // The next lesson is in the same chapter
      nextLessonId =
        chapters[currentChapterIndex].lessons[currentLessonIndex + 1].id;
    } else if (currentChapterIndex < chapters.length - 1) {
      // The next lesson is in the next chapter
      nextLessonId = chapters[currentChapterIndex + 1].lessons[0].id;
    }

    return nextLessonId;
  }
}
