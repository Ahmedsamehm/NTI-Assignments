import { Course } from './course';

export interface Instructor {
  _id?: string;
  id?: string;
  name: string;
  email: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  order: number;
}

export interface CourseDetails extends Omit<Course, 'instructor'> {
  instructor: Instructor;
  lessons: Lesson[];
}
