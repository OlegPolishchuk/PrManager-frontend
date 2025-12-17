import { twMerge } from 'tailwind-merge';

import { LogoutButton } from '@/app/components/buttons/logout-button.tsx';

import { NavigationList } from './navigation-list.tsx';

export const Navigation = () => {
  return (
    <aside
      className={twMerge(
        'hidden md:block',
        'h-[calc(100vh-75px)] w-[200px] min-w-[200px] bg-background',
        'border-r border-r-sidebar-border',
      )}
    >
      <div className={'flex h-full w-[300px] flex-col py-4'}>
        <NavigationList />

        <LogoutButton className={'mt-auto mb-10 w-fit gap-4'}>Выити</LogoutButton>
      </div>
    </aside>
  );
};
