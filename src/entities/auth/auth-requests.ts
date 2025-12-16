import type { AuthRequestFields, LoginResponse, User } from '@/entities/auth/types.ts';
import { api } from '@/lib/api/instance.ts';

export const login = (data: AuthRequestFields) => {
  return api.post<LoginResponse>('/api/auth/login', data);
};

export const register = (data: AuthRequestFields) => {
  return api.post('/api/auth/register', data);
};

export const getProfile = () => {
  return api.get<User>('/api/auth/profile');
};

export const refreshTokens = () => {
  return api.get('/api/auth/refresh');
};

export const logout = () => {
  return api.post('/api/auth/logout');
};
