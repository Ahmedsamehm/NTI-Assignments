import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { RegisterRequest } from '../interfaces/register-request';
import { User } from '../interfaces/user';
import { Response_login } from '../interfaces/Response';
import { catchError, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  readonly user = signal<User | null>(null);

  login(data: LoginRequest) {
    return this.http
      .post<Response_login>(`${environment.apiUrl}/auth/login`, data)
      .pipe(tap((res) => this.user.set(res.data)));
  }

  register(data: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  me() {
    return this.http
      .get<User>(`${environment.apiUrl}/auth/me`)
      .pipe(tap((user) => this.user.set(user)));
  }

  logout() {
    return this.http
      .post(`${environment.apiUrl}/auth/logout`, {})
      .pipe(tap(() => this.user.set(null)));
  }
}
