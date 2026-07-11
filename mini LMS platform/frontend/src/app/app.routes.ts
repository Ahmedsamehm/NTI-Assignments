import { Routes } from '@angular/router';
import { Main } from './shared/components/main/main';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { AuthGuard } from './features/auth/guards/Auth-guard';
import { COURSES_ROUTES } from './features/courses/courses.routes';

export const routes: Routes = [
  ...AUTH_ROUTES,
  {
    path: '',
    component: Main,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/pages/home/home').then(m => m.HomeComponent),
      },
    ],
  },
  ...COURSES_ROUTES,
];

