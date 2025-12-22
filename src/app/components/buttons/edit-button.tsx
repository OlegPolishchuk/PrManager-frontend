import { type ComponentPropsWithRef } from 'react';
import { Pen } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/app/components/ui/button.tsx';

export const EditButton = ({
  className,
  children,
  ...restProps
}: ComponentPropsWithRef<'button'>) => {
  return (
    <Button
      type='button'
      variant={'outline'}
      className={twMerge(
        'bg-warning/20!',
        'group flex cursor-pointer items-center justify-center gap-2',
        'hover:text-warning/70',
        'transition-all',
        className,
      )}
      {...restProps}
    >
      {children}
      <Pen className={'transition-all group-hover:text-warning/70'} />
    </Button>
  );
};
