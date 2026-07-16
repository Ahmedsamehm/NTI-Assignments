export interface EnrollmentResponse {
  status: string;
  message: string;
  enrolled_at: string;
  course_id: number;
  student_id: number;
}

export interface StudentEnrollment {
  _id: string;
  student: string;
  course: import('./course').Course;
  progress: number;
  completedLessons: {
    lesson: string;
    completedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

