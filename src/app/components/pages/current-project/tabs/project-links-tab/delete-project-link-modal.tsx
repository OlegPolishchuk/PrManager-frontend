import { Separator } from '@radix-ui/react-separator';

import { DeleteButton } from '@/app/components/buttons/delete-button.tsx';
import { Button } from '@/app/components/ui/button.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog.tsx';
import { Field } from '@/app/components/ui/field.tsx';
import { useDeleteProjectLink } from '@/entities/project-link/hooks.ts';
import type { ProjectLink } from '@/entities/project-link/types.ts';

interface Props {
  link: ProjectLink;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteProjectLinkModal = ({ link, open, onOpenChange }: Props) => {
  const deleteLinkMutation = useDeleteProjectLink();
  const disabled = deleteLinkMutation.isPending;

  const handleDeleteLink = () => {
    deleteLinkMutation.mutate(link.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className={'max-h-[90%]'}>
        <DialogHeader>
          <DialogTitle>Удалить заметку</DialogTitle>
          <DialogDescription>
            Вы действительно хотите удалить ссылку
            <a href={link.url} target={'_blank'} className={'ml-2 font-semibold underline'}>
              {link.title}
            </a>
          </DialogDescription>
        </DialogHeader>

        <Separator className={'h-[1px] bg-border'} />

        <DialogFooter>
          <Field orientation='horizontal' className={'min-h-[38px] justify-end'}>
            <DialogClose asChild>
              <Button type='button' variant='outline' disabled={disabled}>
                Отменить
              </Button>
            </DialogClose>

            <DeleteButton disabled={disabled} onClick={handleDeleteLink}>
              Удалить
            </DeleteButton>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
