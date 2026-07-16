import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { DashboardMetricCardComponent } from '../../components/metric-card/metric-card';
import { DashboardLearningCardComponent } from '../../components/learning-card/learning-card';

interface LearningProgress {
  courseTitle: string;
  moduleTitle: string;
  category: string;
  progress: number;
  image?: string;
  courseId?: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardMetricCardComponent,
    DashboardLearningCardComponent,
  ],
  templateUrl: './student-dashboard.html',
})
export class StudentDashboardComponent implements OnInit {
  private readonly router = inject(Router);

  constructor(
    protected readonly authService: AuthService,
    private readonly coursesService: CoursesService,
  ) {}

  learningItems = signal<LearningProgress[]>([]);

  completedCount = computed(() => {
    return this.learningItems().filter((item) => item.progress === 100).length;
  });

  enrolledCount = computed(() => {
    return this.learningItems().length;
  });

  ngOnInit() {
    if (!this.authService.user()) {
      this.authService.me().subscribe({
        next: () => this.loadStudentData(),
        error: () => this.loadStudentData(),
      });
    } else {
      this.loadStudentData();
    }
  }

  loadStudentData() {
    this.coursesService.getMyEnrollments().subscribe({
      next: (res) => {
        if (res?.data?.length) {
          const apiItems = res.data.map((enrollment) => ({
            courseTitle: enrollment.course?.title || 'Untitled Course',
            moduleTitle: enrollment.progress === 100 ? 'Course Completed' : `Module 1: Getting Started`,
            category: enrollment.course?.category || 'General',
            progress: enrollment.progress || 0,
            image: enrollment.course?.thumbnail || enrollment.course?.image || '/images/course_ui_ux.png',
            courseId: enrollment.course?._id,
          }));
          this.learningItems.set(apiItems);
        } else {
          this.learningItems.set([]);
        }
      },
      error: (err) => {
        console.warn('Error loading student enrollments:', err);
        this.learningItems.set([]);
      },
    });
  }

  handleCardAction(item: LearningProgress) {
    if (item.courseId) {
      this.router.navigate(['/courses', item.courseId]);
    }
  }
}
