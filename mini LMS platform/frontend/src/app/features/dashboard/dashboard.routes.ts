import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/Auth-guard';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { DashboardOverviewComponent } from './pages/overview/overview';
import { DashboardCoursesListComponent } from './pages/courses-list/courses-list';
import { MyCoursesComponent } from './pages/my-courses/my-courses';
import { ProfileComponent } from '../users/pages/profile/profile';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { adminGuard } from '../auth/guards/admin.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardOverviewComponent,
        title: 'Dashboard - Overview',
      },
      {
        path: 'courses',
        component: DashboardCoursesListComponent,
        title: 'Dashboard - Explore Courses',
      },
      {
        path: 'my-courses',
        component: MyCoursesComponent,
        title: 'Dashboard - My Learning',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Dashboard - My Profile',
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [adminGuard],
        title: 'Dashboard - Admin Panel',
      },
    ],
  },
];
