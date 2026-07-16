import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../courses/interfaces/api-response';
import { User } from '../../auth/interfaces/user';
import { AdminUser, CreateUserPayload, UpdateUserPayload } from '../interfaces/admin-user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<ApiResponse<User>>(`${environment.apiUrl}/users/me`);
  }

  getUsers(filters?: { role?: string; email?: string }) {
    let params = new HttpParams();
    if (filters?.role) {
      params = params.set('role', filters.role);
    }
    if (filters?.email) {
      params = params.set('email', filters.email);
    }
    return this.http.get<ApiResponse<AdminUser[]>>(`${environment.apiUrl}/users`, { params });
  }

  createUser(data: CreateUserPayload) {
    return this.http.post<ApiResponse<AdminUser>>(`${environment.apiUrl}/users`, data);
  }

  updateUser(id: string, data: UpdateUserPayload) {
    return this.http.patch<ApiResponse<AdminUser>>(`${environment.apiUrl}/users/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete<ApiResponse<null>>(`${environment.apiUrl}/users/${id}`);
  }
}
