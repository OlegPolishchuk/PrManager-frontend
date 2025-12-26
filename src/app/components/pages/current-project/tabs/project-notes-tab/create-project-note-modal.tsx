import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-separator';

import { CreateButton } from '@/app/components/buttons/create-button.tsx';
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

const FORM_ID = 'project-link-create-form';

interface Props {
  className?: string;
  children?: React.ReactNode;
  projectId: string;
}

export const CreateProjectNoteModal = ({ className, children, projectId }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<ProjectNoteSchema>({
    resolver: zodResolver(projectNoteSchema),
    defaultValues: {
      title: '',
      value: '',
      projectId,
      type: 'CREDENTIALS',
      links: [],
    },
  });
  const createNoteMutation = useCreateNote();
  const disabled = createNoteMutation.isPending;

  console.log(form.formState.errors);

  const handleSubmit = (data: ProjectNoteSchema) => {
    console.log(data);

    createNoteMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <CreateButton className={className}>{children}</CreateButton>
        </DialogTrigger>
        <DialogContent className={'max-h-[90%]'}>
          <DialogHeader>
            <DialogTitle>Новая заметка</DialogTitle>
            <DialogDescription>
              Выберите тип заметки. Для «Заметка» — заполните текст, для остальных типов — добавьте
              название и данные.
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
                Добавить
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
