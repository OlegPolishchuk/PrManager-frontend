export interface UpdateProfileRequestFields {
  id: string;
  name?: string;
}

export interface UpdatePasswordRequestFields {
  id: string;
  password: string;
  newPassword: string;
}

export interface LoginResponse {
  accessToken: string;
}
