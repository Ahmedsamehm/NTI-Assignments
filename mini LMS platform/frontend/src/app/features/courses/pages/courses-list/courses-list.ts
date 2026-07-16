import { Component, signal, OnInit, Inject, PLATFORM_ID, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { HlmButtonImports } from '../../../../shared/components/ui/button/src';
import { HlmInputImports } from '../../../../shared/components/ui/input/src';
import { HlmAvatarImports } from '../../../../shared/components/ui/avatar/src';
import { Course } from '../../interfaces/course';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { Header } from '../../../../shared/components/header/header';
import { Footer } from '../../../../shared/components/footer/footer';
import { CoursesService } from '../../services/courses.service';
import { MobileNavComponent, MobileNavItem } from '../../../../shared/components/mobile-nav/mobile-nav';

@Component({
  selector: 'app-courses-list',
  imports: [
    HlmButtonImports,
    HlmInputImports,
    HlmAvatarImports,
    CourseCardComponent,
    Header,
    Footer,
    MobileNavComponent,
  ],
  templateUrl: './courses-list.html',
})
export class CoursesListComponent implements OnInit {
  categories = signal<string[]>(['All Topics']);
  activeCategory = signal<string>('All Topics');
  courses = signal<Course[]>([]);
  searchQuery = signal<string>('');

  private searchSubject = new Subject<string>();

  mobileNavItems = computed<MobileNavItem[]>(() => {
    const isLoggedIn = !!this.authService.user();

    if (isLoggedIn) {
      return [
        {
          label: 'Home',
          routerLink: '/',
          iconName: 'home',
        },
        {
          label: 'Dashboard',
          routerLink: '/dashboard',
          iconName: 'learning',
        },
        {
          label: 'Courses',
          routerLink: '/courses',
          iconName: 'courses',
        },
      ];
    } else {
      return [
        {
          label: 'Home',
          routerLink: '/',
          iconName: 'home',
        },
        {
          label: 'Courses',
          routerLink: '/courses',
          iconName: 'courses',
        },
        {
          label: 'Log In',
          routerLink: '/login',
          iconName: 'login',
        },
      ];
    }
  });

  constructor(
    protected authService: AuthService,
    private coursesService: CoursesService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.me();

      // Debounce search query changes to avoid spamming the backend
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
          console.error('Error fetching courses:', err);
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
        console.error('Error fetching categories:', err);
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
