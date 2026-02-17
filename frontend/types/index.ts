export type TaskStatus = 'pending' | 'completed';

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
