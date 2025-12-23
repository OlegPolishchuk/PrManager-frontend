import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/app/components/ui/button.tsx';
import { useCopy } from '@/lib/hooks/use-copy.tsx';

interface Props {
  value: string;
  className?: string;
  noteDuration?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const CopyButton = ({ className, value, children, onClick, noteDuration = 3000 }: Props) => {
  const { copy } = useCopy();

  const handleCopy = () => {
    copy(value)
      .then(() => {
        toast.success('Скопировано в буфер!', {
          duration: noteDuration,
        });

        if (onClick) onClick();
      })
      .catch((err) => {
        console.log('error =>', err);
        toast.error('Ошибка копирования!', {
          duration: noteDuration,
        });
      });
  };

  return (
    <Button variant={'outline'} className={className} onClick={handleCopy}>
      {children}
      <Copy />
    </Button>
  );
};
