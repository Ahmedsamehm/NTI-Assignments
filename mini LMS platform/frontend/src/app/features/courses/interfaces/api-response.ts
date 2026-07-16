export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
