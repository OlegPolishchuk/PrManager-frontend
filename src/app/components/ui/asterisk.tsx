import { type ComponentPropsWithRef } from 'react';
import { clsx } from 'clsx';
import { Asterisk as AsteriskIcon } from 'lucide-react';

export const Asterisk = ({ className, ...props }: ComponentPropsWithRef<'svg'>) => {
  return (
    <AsteriskIcon
      className={clsx('mt-[-2px] ml-[-8px] h-[8px] w-[8px] text-destructive', className)}
      {...props}
    />
  );
};
