import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req.clone({ withCredentials: true })).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        auth.user() &&
        !req.url.includes('/auth/')
      ) {
        return auth.refreshToken().pipe(
          switchMap(() => next(req.clone({ withCredentials: true }))),
          catchError((refreshError) => {
            auth.user.set(null);
            return throwError(() => refreshError);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
