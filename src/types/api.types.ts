export interface ApiErrorResponse {
  message: string;
  details: string;
  statusCode: number;
}

export interface APIResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}
