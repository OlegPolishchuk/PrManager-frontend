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
import { useDeleteNote } from '@/entities/notes/hooks.tsx';
import type { Note } from '@/entities/notes/types.ts';

interface Props {
  note: Note;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteProjectNoteModal = ({ note, open, onOpenChange }: Props) => {
  const deleteNoteMutation = useDeleteNote();
  const disabled = deleteNoteMutation.isPending;

  const handleSubmit = () => {
    deleteNoteMutation.mutate(
      { projectId: note.projectId, noteId: note.id },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className={'max-h-[90%]'}>
        <DialogHeader>
          <DialogTitle>Удалить заметку</DialogTitle>
          <DialogDescription>Вы действительно хотите удалить заметку ?</DialogDescription>
        </DialogHeader>

        <Separator className={'h-[1px] bg-border'} />

        <DialogFooter>
          <Field orientation='horizontal' className={'min-h-[38px] justify-end'}>
            <DialogClose asChild>
              <Button type='button' variant='outline' disabled={disabled}>
                Отменить
              </Button>
            </DialogClose>

            <DeleteButton disabled={disabled} onClick={handleSubmit}>
              Удалить
            </DeleteButton>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
