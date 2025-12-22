import { type ComponentPropsWithRef } from 'react';
import { Trash } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/app/components/ui/button.tsx';

export const DeleteButton = ({
  className,
  children,
  ...restProps
}: ComponentPropsWithRef<'button'>) => {
  return (
    <Button
      type='button'
      variant={'outline'}
      className={twMerge(
        'bg-destructive/20!',
        'group flex cursor-pointer items-center justify-center gap-2',
        'hover:text-destructive/70',
        'transition-all',
        className,
      )}
      {...restProps}
    >
      {children}
      <Trash className={'transition-all group-hover:text-destructive/70'} />
    </Button>
  );
};
