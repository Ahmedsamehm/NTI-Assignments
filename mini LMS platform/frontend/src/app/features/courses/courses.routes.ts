import { Routes } from '@angular/router';
import { CoursesListComponent } from './pages/courses-list/courses-list';
import { AuthGuard } from '../auth/guards/Auth-guard';

export const COURSES_ROUTES: Routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
    canActivate: [AuthGuard],
    title: 'Courses',
  },
];
