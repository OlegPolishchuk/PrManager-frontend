import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

import { Header } from '@/app/components/header/header.tsx';
import { Navigation } from '@/app/components/navigation/navigation.tsx';
import { refreshTokensOptions, userQueryOptions } from '@/entities/auth/hooks.ts';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;

    let userResponse;

    try {
      userResponse = await queryClient.ensureQueryData(userQueryOptions);
    } catch (err: unknown) {
      const error = err as AxiosError;
      const status = error?.response?.status ?? error?.status;
      if (status !== 401) {
        throw redirect({ to: '/login' });
      }

      try {
        /* Тут будет делать рефреш токенов */
        /* Возможно это не лучшее есто  */
        await queryClient.ensureQueryData(refreshTokensOptions);
        userResponse = await queryClient.ensureQueryData(userQueryOptions);
      } catch {
        throw redirect({ to: '/login' });
      }
    }

    const user = userResponse.data;
    const isAuth = !!user?.id;

    if (!isAuth) {
      throw redirect({ to: '/login' });
    }
  },
});

function AuthenticatedLayout() {
  return (
    <div className={'flex min-h-screen flex-col'}>
      <Header />

      <div className={'container flex'}>
        <Navigation />

        <main className={'w-full py-6 md:pl-6'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
