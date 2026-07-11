import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (authService.user()) {
    return true;
  }

  if (!isPlatformBrowser(platformId)) {
    return true;
  }
  return authService.me().pipe(
    map(() => true),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    }),
  );
};

export const GuestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (authService.user()) {
    return router.createUrlTree(['/']);
  }

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return authService.me().pipe(
    map(() => {
      return router.createUrlTree(['/']);
    }),
    catchError(() => {
      return of(true);
    }),
  );
};
