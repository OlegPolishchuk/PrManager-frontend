import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/app/components/ui/button.tsx';
import { useCopy } from '@/lib/hooks/use-copy.tsx';

interface Props {
  value: string;
  className?: string;
  noteDuration?: number;
}

export const CopyButton = ({ className, value, noteDuration = 3000 }: Props) => {
  const { copy } = useCopy();

  const handleCopy = () => {
    copy(value)
      .then(() => {
        toast.success('Скопировано в буфер!', {
          duration: noteDuration,
        });
      })
      .catch(() => {
        toast.error('Ошибка копирования!', {
          duration: noteDuration,
        });
      });
  };

  return (
    <Button variant={'outline'} className={className} onClick={handleCopy}>
      <Copy />
    </Button>
  );
};
