export interface AuthRequestFields {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  projects?: [];
  createdAt: string;
  updatedAt: string;
}
