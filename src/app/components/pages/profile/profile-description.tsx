import { twMerge } from 'tailwind-merge';

import { ProfileNameForm } from '@/app/components/pages/profile/profile-name-form.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import type { User } from '@/entities/auth/types.ts';
import { formatDate } from '@/lib/utils.ts';

interface Props {
  user: User;
}

export const ProfileDescription = ({ user }: Props) => {
  return (
    <div className={twMerge('flex flex-col items-center gap-6', 'md:flex-row md:items-start')}>
      <Avatar className={'h-[100px] w-[100px] md:h-[250px] md:w-[250px]'}>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className={'w-full'}>
        <ProfileNameForm
          className={'mb-6 md:items-start'}
          username={user.name ?? 'Username'}
          userId={user.id}
        />

        <div className={'flex w-full flex-col gap-2 px-4'}>
          <div className={'flex items-center justify-between'}>
            <Typography variant={'small'}>Email:</Typography>
            <Typography tag={user.name ? 'p' : 'h1'}>{user.email}</Typography>
          </div>

          <div className={'flex items-center justify-between'}>
            <Typography variant={'small'}>Дата создания:</Typography>
            <Typography variant={'small'}>{formatDate(user.createdAt)}</Typography>
          </div>

          <div className={'flex items-center justify-between'}>
            <Typography variant={'small'}>Дата обновления:</Typography>
            <Typography variant={'small'}>{formatDate(user.updatedAt)}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
