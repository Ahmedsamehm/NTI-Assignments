import { Component, signal, computed, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '../../../../shared/components/ui/button/src';
import { HlmCardImports } from '../../../../shared/components/ui/card/src';
import { HlmBadgeImports } from '../../../../shared/components/ui/badge/src';
import { StudentEnrollment } from '../../../courses/interfaces/enrollment';
import { CoursesService } from '../../../courses/services/courses.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Course } from '../../../courses/interfaces/course';
import { CourseFormModalComponent } from '../../components/course-form-modal/course-form-modal';

@Component({
  selector: 'app-dashboard-my-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    HlmButtonImports,
    HlmCardImports,
    HlmBadgeImports,
    CourseFormModalComponent,
  ],
  templateUrl: './my-courses.html',
})
export class MyCoursesComponent implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly coursesService = inject(CoursesService);

  enrollments = signal<StudentEnrollment[]>([]);

  instructorCourses = signal<Course[]>([]);
  showFormModal = signal(false);
  editingCourse = signal<Course | null>(null);
  confirmDeleteId = signal<string | null>(null);
  isDeleting = signal(false);
  isSaving = signal(false);

  totalCourses = computed(() => this.instructorCourses().length);
  paidCourses = computed(() => this.instructorCourses().filter((c) => c.isPaid).length);
  freeCourses = computed(() => this.instructorCourses().filter((c) => !c.isPaid).length);

  isLoading = signal<boolean>(true);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isInstructor(): boolean {
    return this.authService.user()?.role === 'instructor';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isInstructor) {
        this.loadInstructorCourses();
      } else {
        this.loadMyEnrollments();
      }
    }
  }

  loadInstructorCourses() {
    this.isLoading.set(true);
    this.coursesService.getMyCourses().subscribe({
      next: (res) => {
        this.instructorCourses.set(res?.data?.data ?? []);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  openCreateModal() {
    this.editingCourse.set(null);
    this.showFormModal.set(true);
  }

  openEditModal(course: Course) {
    this.editingCourse.set(course);
    this.showFormModal.set(true);
  }

  closeModal() {
    this.showFormModal.set(false);
    this.editingCourse.set(null);
  }

  onSave(data: Partial<Course>) {
    this.isSaving.set(true);
    const editing = this.editingCourse();
    const request = editing
      ? this.coursesService.updateCourse(editing._id, data)
      : this.coursesService.createCourse(data);

    request.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeModal();
        this.loadInstructorCourses();
      },
      error: () => this.isSaving.set(false),
    });
  }

  askDelete(courseId: string) {
    this.confirmDeleteId.set(courseId);
  }

  cancelDelete() {
    this.confirmDeleteId.set(null);
  }

  confirmDelete() {
    const id = this.confirmDeleteId();
    if (!id) return;
    this.isDeleting.set(true);
    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.confirmDeleteId.set(null);
        this.instructorCourses.update((list) => list.filter((c) => c._id !== id));
      },
      error: () => {
        this.isDeleting.set(false);
        this.confirmDeleteId.set(null);
      },
    });
  }

  // Lessons Management state
  showLessonsModal = signal(false);
  selectedCourse = signal<Course | null>(null);
  lessons = signal<any[]>([]);
  isLessonsLoading = signal(false);
  showLessonForm = signal(false);
  editingLesson = signal<any | null>(null);
  lessonTitle = signal('');
  lessonContent = signal('');
  lessonVideoUrl = signal('');
  isLessonSaving = signal(false);

  openLessonsModal(course: Course) {
    this.selectedCourse.set(course);
    this.showLessonsModal.set(true);
    this.loadLessons(course._id);
  }

  closeLessonsModal() {
    this.showLessonsModal.set(false);
    this.selectedCourse.set(null);
    this.lessons.set([]);
    this.closeLessonForm();
  }

  loadLessons(courseId: string) {
    this.isLessonsLoading.set(true);
    this.coursesService.getLessons(courseId).subscribe({
      next: (res) => {
        this.lessons.set(res?.data ?? []);
        this.isLessonsLoading.set(false);
      },
      error: () => this.isLessonsLoading.set(false),
    });
  }

  openAddLesson() {
    this.editingLesson.set(null);
    this.lessonTitle.set('');
    this.lessonContent.set('');
    this.lessonVideoUrl.set('');
    this.showLessonForm.set(true);
  }

  openEditLesson(lesson: any) {
    this.editingLesson.set(lesson);
    this.lessonTitle.set(lesson.title);
    this.lessonContent.set(lesson.content || '');
    this.lessonVideoUrl.set(lesson.videoUrl || '');
    this.showLessonForm.set(true);
  }

  closeLessonForm() {
    this.showLessonForm.set(false);
    this.editingLesson.set(null);
  }

  saveLesson() {
    const course = this.selectedCourse();
    if (!course || !this.lessonTitle().trim()) return;

    this.isLessonSaving.set(true);
    const payload = {
      title: this.lessonTitle().trim(),
      content: this.lessonContent().trim(),
      videoUrl: this.lessonVideoUrl().trim(),
    };

    const editing = this.editingLesson();
    const request = editing
      ? this.coursesService.updateLesson(course._id, editing._id || editing.id, payload)
      : this.coursesService.createLesson(course._id, payload);

    request.subscribe({
      next: () => {
        this.isLessonSaving.set(false);
        this.closeLessonForm();
        this.loadLessons(course._id);
      },
      error: () => this.isLessonSaving.set(false),
    });
  }

  deleteLesson(lessonId: string) {
    const course = this.selectedCourse();
    if (!course) return;

    this.coursesService.deleteLesson(course._id, lessonId).subscribe({
      next: () => {
        this.lessons.update((list) => list.filter((l) => (l._id || l.id) !== lessonId));
      },
    });
  }

  loadMyEnrollments() {
    this.isLoading.set(true);
    this.coursesService.getMyEnrollments().subscribe({
      next: (res) => {
        this.enrollments.set(res.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching student enrollments:', err);
        this.isLoading.set(false);
      },
    });
  }

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/images/hero_student.png';
  }
}
