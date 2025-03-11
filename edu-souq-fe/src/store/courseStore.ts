import { create } from "zustand";

interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  mediaType?: 'none' | 'image' | 'video' | 'document';
  mediaUrl?: string;
}

interface CourseState {
  courses: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (id: string) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
  removeCourse: (id) => set((state) => ({ courses: state.courses.filter((c) => c.id !== id) })),
}));
