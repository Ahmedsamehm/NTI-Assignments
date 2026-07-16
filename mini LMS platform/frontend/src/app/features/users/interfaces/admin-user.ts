export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: 'student' | 'instructor' | 'admin';
}
