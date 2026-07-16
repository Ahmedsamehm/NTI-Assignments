import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs';
import { Course } from '../interfaces/course';
import { EnrollmentResponse, StudentEnrollment } from '../interfaces/enrollment';
import { CourseDetails } from '../interfaces/course-details';
import { ApiResponse, PaginatedData } from '../interfaces/api-response';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAvailableCourses(filters?: { category?: string; search?: string }) {
    let params = new HttpParams();
    if (filters?.category && filters.category !== 'All Topics') {
      params = params.set('category', filters.category);
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }

    return this.http.get<ApiResponse<PaginatedData<Course>>>(`${environment.apiUrl}/courses`, {
      params,
    });
  }

  getCategories() {
    return this.http.get<ApiResponse<PaginatedData<Category>>>(`${environment.apiUrl}/categories`);
  }

  getMyCourses() {
    return this.http.get<ApiResponse<PaginatedData<Course>>>(`${environment.apiUrl}/courses/my`);
  }

  getMyEnrollments() {
    return this.http.get<ApiResponse<StudentEnrollment[]>>(`${environment.apiUrl}/enrollments/me`);
  }

  enroll(courseId: string) {
    return this.http.post<ApiResponse<any>>(`${environment.apiUrl}/enrollments`, { courseId });
  }

  updateProgress(enrollmentId: string, lessonId: string) {
    return this.http.patch<ApiResponse<any>>(
      `${environment.apiUrl}/enrollments/${enrollmentId}/progress`,
      { lessonId },
    );
  }

  getCourseById(id: string) {
    return this.http.get<ApiResponse<CourseDetails>>(`${environment.apiUrl}/courses/${id}`);
  }

  createCourse(data: Partial<Course>) {
    return this.http.post<ApiResponse<Course>>(`${environment.apiUrl}/courses`, data);
  }

  updateCourse(id: string, data: Partial<Course>) {
    return this.http.patch<ApiResponse<Course>>(`${environment.apiUrl}/courses/${id}`, data);
  }

  deleteCourse(id: string) {
    return this.http.delete<ApiResponse<null>>(`${environment.apiUrl}/courses/${id}`);
  }

  createCategory(data: { name: string; description?: string }) {
    return this.http.post<ApiResponse<Category>>(`${environment.apiUrl}/categories`, data);
  }

  updateCategory(id: string, data: { name?: string; description?: string }) {
    return this.http.patch<ApiResponse<Category>>(`${environment.apiUrl}/categories/${id}`, data);
  }

  deleteCategory(id: string) {
    return this.http.delete<ApiResponse<null>>(`${environment.apiUrl}/categories/${id}`);
  }

  getLessons(courseId: string) {
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/courses/${courseId}/lessons`);
  }

  createLesson(courseId: string, data: { title: string; content?: string; videoUrl?: string }) {
    return this.http.post<ApiResponse<any>>(`${environment.apiUrl}/courses/${courseId}/lessons`, data);
  }

  updateLesson(courseId: string, lessonId: string, data: { title?: string; content?: string; videoUrl?: string }) {
    return this.http.patch<ApiResponse<any>>(`${environment.apiUrl}/courses/${courseId}/lessons/${lessonId}`, data);
  }

  deleteLesson(courseId: string, lessonId: string) {
    return this.http.delete<ApiResponse<null>>(`${environment.apiUrl}/courses/${courseId}/lessons/${lessonId}`);
  }

  searchCourses(query: string) {
    return this.http
      .get<ApiResponse<Course[]>>(`${environment.apiUrl}/search/courses`, {
        params: { query },
      })
      .pipe(map((res) => res.data));
  }
}

