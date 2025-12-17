import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { getProfile } from '@/entities/auth/auth-requests.ts'; // там, где он объявлен
import { userQueryOptions } from '@/entities/auth/hooks.ts';
import type { User } from '@/entities/auth/types.ts';
import { updateProfile, updateProfilePassword } from '@/entities/profile/profile-requests.ts';
import type { UpdateProfileRequestFields } from '@/entities/profile/types.ts';
import { AUTH_ERROR_MESSAGES } from '@/lib/constants.ts';
import { handleError } from '@/lib/utils.ts';

type MeResponse = Awaited<ReturnType<typeof getProfile>>; // например { data: User }

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onMutate: async (newData: UpdateProfileRequestFields) => {
      await queryClient.cancelQueries({ queryKey: userQueryOptions.queryKey });

      const prevMe = queryClient.getQueryData<MeResponse>(userQueryOptions.queryKey);
      if (!prevMe) return { prevMe: null };

      const prevUser = prevMe.data as User;

      queryClient.setQueryData<MeResponse>(userQueryOptions.queryKey, {
        ...prevMe,
        data: { ...prevUser, ...newData },
      });

      // вернём контекст для отката
      return { prevMe };
    },
    onError: (_err, _variables, context) => {
      if (context?.prevMe) {
        queryClient.setQueryData(userQueryOptions.queryKey, context.prevMe);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueryOptions.queryKey });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updateProfilePassword,
    onError: (error) => handleError(error, AUTH_ERROR_MESSAGES),
  });
};
