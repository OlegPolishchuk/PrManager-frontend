import { Link } from '@tanstack/react-router';
import { clsx } from 'clsx';
import { User as ProfileIcon } from 'lucide-react';

import { LogoutButton } from '@/app/components/buttons/logout-button.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import type { User } from '@/entities/auth/types.ts';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Props {
  triggerClassName?: string;
  user: User;
}

export const ProfileDropdownMenu = ({ user, triggerClassName }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={clsx('group flex items-center gap-2', triggerClassName)}>
        {user.name && (
          <Typography className={'transition-all group-hover:text-destructive'}>
            {user.name}
          </Typography>
        )}
        <Avatar className={'h-[50px] w-[50px]'}>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel className={'text-muted-foreground'}>{user.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={'/profile'} className={'flex items-center gap-2'}>
            <ProfileIcon />
            Профиль
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton>Выход</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
