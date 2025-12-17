import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/app/components/ui/button.tsx';

export const CreateButton = ({
  children,
  className,
  icon,
  ...restProps
}: ComponentPropsWithRef<'button'> & {
  icon?: ReactNode;
}) => {
  return (
    <Button
      {...restProps}
      variant={'outline'}
      className={twMerge('w-fit border-destructive', className)}
    >
      {children}
      {icon ? icon : <Plus className={'text-destructive'} />}
    </Button>
  );
};
