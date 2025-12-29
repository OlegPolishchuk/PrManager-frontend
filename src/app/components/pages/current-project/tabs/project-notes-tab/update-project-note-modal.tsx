import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-separator';

import { ProjectNoteForm } from '@/app/components/pages/current-project/tabs/project-notes-tab/project-note-form.tsx';
import {
  type ProjectNoteSchema,
  projectNoteSchema,
} from '@/app/components/pages/current-project/tabs/project-notes-tab/schema.ts';
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
import { ScrollArea } from '@/app/components/ui/scroll-area.tsx';
import { useCreateNote } from '@/entities/notes/hooks.tsx';
import type { Note } from '@/entities/notes/types.ts';

const FORM_ID = 'project-link-update-form';

interface Props {
  note: Note;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateProjectNoteModal = ({ note, open, onOpenChange }: Props) => {
  const form = useForm<ProjectNoteSchema>({
    resolver: zodResolver(projectNoteSchema),
    defaultValues:
      note.type === 'NOTE'
        ? {
            type: 'NOTE',
            links: note.links,
            projectId: note.projectId,
            records: note.records,
            note: note.note,
          }
        : {
            type: note.type,
            links: note.links,
            projectId: note.projectId,
            records: note.records,
            groupTitle: note.groupTitle,
          },
  });
  const createNoteMutation = useCreateNote();
  const disabled = createNoteMutation.isPending;

  const handleSubmit = (data: ProjectNoteSchema) => {
    console.log(data);

    createNoteMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className={'max-h-[90%]'}>
          <DialogHeader>
            <DialogTitle>Редактировать заметку</DialogTitle>
            <DialogDescription>
              Внесите изменения в заметку и нажмите «Сохранить», чтобы обновить данные.
            </DialogDescription>
          </DialogHeader>

          <Separator className={'h-[1px] bg-border'} />

          <ScrollArea className={'h-[300px] md:h-full'}>
            <ProjectNoteForm formId={FORM_ID} submitCallback={handleSubmit} disabled={disabled} />
          </ScrollArea>

          <DialogFooter>
            <Field orientation='horizontal' className={'min-h-[38px] justify-end'}>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => form.reset()}
                  disabled={disabled}
                >
                  Отменить
                </Button>
              </DialogClose>

              <Button type='submit' form={FORM_ID} disabled={disabled} loading={disabled}>
                Сохранить
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
