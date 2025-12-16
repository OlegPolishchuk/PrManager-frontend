import { LogOut } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useLogout } from '@/entities/auth/hooks.ts';

interface Props {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LogoutButton = ({ children, className, onClick }: Props) => {
  const logoutMutation = useLogout();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    logoutMutation.mutate();

    if (onClick) onClick(e);
  };

  return (
    <button
      className={twMerge(
        'group flex cursor-pointer items-center justify-center gap-2 border-none outline-none',
        'disabled:cursor-not-allowed',
        'hover:text-destructive',
        'transition-all',
        className,
      )}
      onClick={handleClick}
      disabled={logoutMutation.isPending}
    >
      <LogOut className={'transition-all group-hover:text-destructive'} />
      {children}
    </button>
  );
};
