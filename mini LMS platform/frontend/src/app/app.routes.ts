import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { COURSES_ROUTES } from './features/courses/courses.routes';
import { DASHBOARD_ROUTES } from './features/dashboard/dashboard.routes';
import { HomeComponent } from './features/home/pages/home/home';

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: '',
    component: HomeComponent,
  },
  ...COURSES_ROUTES,
  ...DASHBOARD_ROUTES,
];

