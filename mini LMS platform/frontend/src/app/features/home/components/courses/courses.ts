import { Component, OnInit, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { CoursesService } from '../../../courses/services/courses.service';
import { Course } from '../../../courses/interfaces/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, HlmCardImports, HlmBadgeImports],
  templateUrl: './courses.html',
})
export class CoursesComponent implements OnInit {
  courses = signal<Course[]>([]);

  constructor(
    private coursesService: CoursesService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.coursesService.getAvailableCourses().subscribe({
      next: (res) => {
        // Show up to 3 courses on the landing page
        if (res && res.data && res.data.data) {
          this.courses.set(res.data.data.slice(0, 3));
        }
      },
      error: (err) => {
        console.error('Error fetching courses for landing page:', err);
      },
    });
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/images/hero_student.png';
  }
}
