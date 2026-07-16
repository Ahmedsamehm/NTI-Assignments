import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HlmButtonImports } from '../../../../shared/components/ui/button/src';
import { HlmInputImports } from '../../../../shared/components/ui/input/src';
import { Course } from '../../../courses/interfaces/course';
import { CourseCardComponent } from '../../../courses/components/course-card/course-card';
import { CoursesService } from '../../../courses/services/courses.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonImports,
    HlmInputImports,
    CourseCardComponent,
  ],
  templateUrl: './courses-list.html',
})
export class DashboardCoursesListComponent implements OnInit {
  categories = signal<string[]>(['All Topics']);
  activeCategory = signal<string>('All Topics');
  courses = signal<Course[]>([]);
  searchQuery = signal<string>('');

  private searchSubject = new Subject<string>();

  constructor(
    private coursesService: CoursesService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
        this.searchQuery.set(query);
        this.loadCourses();
      });
    }
  }

  loadCourses() {
    this.coursesService
      .getAvailableCourses({
        category: this.activeCategory(),
        search: this.searchQuery(),
      })
      .subscribe({
        next: (res) => {
          this.courses.set(res.data.data);
        },
        error: (err) => {
          console.error('Error fetching dashboard courses:', err);
        },
      });
  }

  loadCategories() {
    this.coursesService.getCategories().subscribe({
      next: (res) => {
        if (res && res.data && res.data.data) {
          const names = res.data.data.map((cat) => cat.name);
          this.categories.set(['All Topics', ...names]);
        }
      },
      error: (err) => {
        console.error('Error fetching dashboard categories:', err);
      },
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCourses();
      this.loadCategories();
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  selectCategory(category: string) {
    this.activeCategory.set(category);
    this.loadCourses();
  }
}
