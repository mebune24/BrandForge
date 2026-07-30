import { simulatedApi } from './simulatedApi';
import type { AuthResponse, LoginInput, RegisterInput, User } from '../types';

export async function registerUser(data: RegisterInput): Promise<AuthResponse> {
  return simulatedApi.auth.register(data);
}

export async function loginUser(data: LoginInput): Promise<AuthResponse> {
  return simulatedApi.auth.login(data);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCurrentUser(_token: string): Promise<User> {
  const user = simulatedApi.auth.getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  return user;
}
