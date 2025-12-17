import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { ProfileDescription } from '@/app/components/pages/profile/profile-description.tsx';
import { ProfilePasswordForm } from '@/app/components/pages/profile/profile-password-form.tsx';
import { userQueryOptions } from '@/entities/auth/hooks.ts';

export const Route = createFileRoute('/_authenticated/profile/')({
  component: ProfilePage,
  loader: ({ context }) => context.queryClient.ensureQueryData(userQueryOptions),
});

function ProfilePage() {
  const userResponse = useSuspenseQuery(userQueryOptions);
  const user = userResponse.data.data;

  return (
    <div className={'flex flex-col gap-10'}>
      <ProfileDescription user={user} />
      <ProfilePasswordForm userId={user.id} />
    </div>
  );
}
