import { Routes } from '@angular/router';
import { CoursesListComponent } from './pages/courses-list/courses-list';
import { CourseDetailsComponent } from './pages/course-details/course-details';
import { AuthGuard } from '../auth/guards/Auth-guard';

export const COURSES_ROUTES: Routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
    canActivate: [AuthGuard],
    title: 'Courses',
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
    canActivate: [AuthGuard],
    title: 'Course Details',
  },
];
