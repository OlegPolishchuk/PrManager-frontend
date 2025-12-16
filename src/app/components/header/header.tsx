import { ProfileDropdownMenu } from '@/app/components/profile-dropdown-menu/profile-dropdown-menu.tsx';
import { ThemeSwitcher } from '@/app/components/theme-switcher/theme-switcher.tsx';
import { useGetUserProfile } from '@/entities/auth/hooks.ts';

export const Header = () => {
  const user = useGetUserProfile();

  return (
    <header className={'border-b py-3'}>
      <div className={'relative container flex w-full items-center justify-center'}>
        <ThemeSwitcher />
        <ProfileDropdownMenu user={user} triggerClassName={'ml-auto'} />
      </div>
    </header>
  );
};
