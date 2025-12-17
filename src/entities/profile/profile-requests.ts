import type { User } from '@/entities/auth/types.ts';
import type {
  UpdatePasswordRequestFields,
  UpdateProfileRequestFields,
} from '@/entities/profile/types.ts';
import { api } from '@/lib/api/instance.ts';

export const updateProfile = (data: UpdateProfileRequestFields) => {
  const { id, ...restData } = data;
  return api.put<User>(`/api/users/${id}`, restData);
};

export const updateProfilePassword = (data: UpdatePasswordRequestFields) => {
  const { id, ...restData } = data;
  return api.put<User>(`/api/users/${id}/password`, restData);
};
