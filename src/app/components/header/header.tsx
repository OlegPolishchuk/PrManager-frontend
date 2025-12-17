import { HeaderDropdownMenu } from '@/app/components/header/header-dropdown-menu.tsx';
import { NavigationMobile } from '@/app/components/navigation/navigation-mobile.tsx';
import { ThemeSwitcher } from '@/app/components/theme-switcher/theme-switcher.tsx';
import { useGetUserProfile } from '@/entities/auth/hooks.ts';

export const Header = () => {
  const user = useGetUserProfile();

  return (
    <header className={'border-b py-3'}>
      <div className={'relative container flex w-full items-center justify-between'}>
        <NavigationMobile />

        <ThemeSwitcher />
        <HeaderDropdownMenu user={user} triggerClassName={'md:ml-auto'} />
      </div>
    </header>
  );
};
