import React from 'react';
import { clsx } from 'clsx';
import { Menu } from 'lucide-react';

import { LogoutButton } from '@/app/components/buttons/logout-button.tsx';
import { ThemeSwitcher } from '@/app/components/theme-switcher/theme-switcher.tsx';
import { Button } from '@/app/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/ui/drawer';

import { NavigationList } from './navigation-list';

interface Props {
  className?: string;
}

export const NavigationMobile = ({ className }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer direction={'left'} open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DrawerTrigger className={clsx('md:hidden', className)}>
        <Menu />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle hidden>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription hidden>This action cannot be undone.</DrawerDescription>
          <ThemeSwitcher className={'mx-auto w-fit'} />
        </DrawerHeader>

        <NavigationList className={'w-full'} clickCallback={handleClose} />

        <DrawerFooter>
          <LogoutButton className={'mb-10 w-fit gap-4'}>Выити</LogoutButton>

          <DrawerClose asChild>
            <Button variant='outline'>Отмена</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
