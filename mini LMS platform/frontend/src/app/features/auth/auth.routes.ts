import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Register } from './pages/register/register';
import { GuestGuard } from './guards/Auth-guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
    title: 'Login',
  },
  {
    path: 'register',
    component: Register,
    canActivate: [GuestGuard],
    title: 'Register',
  },
];
