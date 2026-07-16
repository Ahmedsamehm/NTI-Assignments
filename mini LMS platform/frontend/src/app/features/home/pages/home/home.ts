import { Component, inject, computed } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { PartnersComponent } from '../../components/partners/partners';
import { CategoriesComponent } from '../../components/categories/categories';
import { CoursesComponent } from '../../components/courses/courses';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';
import { Header } from '../../../../shared/components/header/header';
import { Footer } from '../../../../shared/components/footer/footer';
import { MobileNavComponent, MobileNavItem } from '../../../../shared/components/mobile-nav/mobile-nav';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Header,
    Footer,
    HeroComponent,
    PartnersComponent,
    CategoriesComponent,
    CoursesComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    MobileNavComponent,
  ],
  templateUrl: './home.html',
})
export class HomeComponent {
  authService = inject(AuthService);

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
}
