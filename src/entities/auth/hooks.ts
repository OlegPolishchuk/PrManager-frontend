import { queryOptions, useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import {
  getProfile,
  login,
  logout,
  refreshTokens,
  register,
} from '@/entities/auth/auth-requests.ts';
import { AUTH_ERROR_MESSAGES, DEFAULT_STALE_TIME } from '@/lib/constants.ts';
import { handleError } from '@/lib/utils.ts';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: '/projects' });
    },
    onError: (error) => handleError(error, AUTH_ERROR_MESSAGES),
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate({ to: '/login' });
    },
    onError: (error) => handleError(error, AUTH_ERROR_MESSAGES),
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate({ to: '/login' });
    },
  });
};

export const userQueryOptions = queryOptions({
  queryKey: ['me'],
  queryFn: getProfile,
  staleTime: DEFAULT_STALE_TIME,
});

export const useGetUser = () => {
  return useQuery({
    ...userQueryOptions,
    retry: false,
  });
};

export const useGetUserProfile = () => {
  const userResponse = useSuspenseQuery(userQueryOptions);
  const user = userResponse.data.data;

  if (!user?.id) throw new Error('User not found');

  return user;
};

export const refreshTokensOptions = queryOptions({
  queryKey: ['refresh-tokens'],
  queryFn: refreshTokens,
});
