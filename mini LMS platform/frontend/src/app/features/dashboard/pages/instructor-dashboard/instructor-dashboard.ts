import { Component, OnInit, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { Course } from '../../../courses/interfaces/course';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './instructor-dashboard.html',
})
export class InstructorDashboardComponent implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly coursesService = inject(CoursesService);
  private readonly platformId = inject(PLATFORM_ID);

  courses = signal<Course[]>([]);
  isLoading = signal(false);

  /** Computed stats */
  totalCourses = computed(() => this.courses().length);
  paidCourses = computed(() => this.courses().filter((c) => c.isPaid).length);
  freeCourses = computed(() => this.courses().filter((c) => !c.isPaid).length);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCourses();
    }
  }

  loadCourses() {
    this.isLoading.set(true);
    this.coursesService.getMyCourses().subscribe({
      next: (res) => {
        this.courses.set(res?.data?.data ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/images/hero_student.png';
  }
}
