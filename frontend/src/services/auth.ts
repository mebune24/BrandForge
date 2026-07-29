import { apiPost, apiGet } from './api';
import type { AuthResponse, LoginInput, RegisterInput, User } from '../types';

export async function registerUser(data: RegisterInput): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/register', data);
}

export async function loginUser(data: LoginInput): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/login', data);
}

export async function getCurrentUser(token: string): Promise<User> {
  return apiGet<User>('/auth/me', token);
}
