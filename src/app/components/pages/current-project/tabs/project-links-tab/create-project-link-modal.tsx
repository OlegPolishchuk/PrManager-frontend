import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateButton } from '@/app/components/buttons/create-button.tsx';
import {
  ProjectLinkForm,
  type ProjectLinkSchema,
  projectLinkSchema,
} from '@/app/components/pages/current-project/tabs/project-links-tab/project-link-form.tsx';
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
import { useCreateProjectLink } from '@/entities/project-link/hooks.ts';

const FORM_ID = 'project-link-create-form';

interface Props {
  className?: string;
  children?: React.ReactNode;
  projectId: string;
}

export const CreateProjectLinkModal = ({ className, children, projectId }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<ProjectLinkSchema>({
    resolver: zodResolver(projectLinkSchema),
    defaultValues: {
      url: '',
      type: 'OTHER',
      title: '',
      description: '',
      projectId,
    },
  });
  const createLinkMutation = useCreateProjectLink();
  const disabled = createLinkMutation.isPending;

  const handleSubmit = (data: ProjectLinkSchema) => {
    console.log(data);
    createLinkMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
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
            <DialogTitle>Новая ссылка</DialogTitle>
            <DialogDescription>
              Заполните поля ниже, чтобы добавить ссылку в текущий проект.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className={'h-[300px] md:h-full'}>
            <ProjectLinkForm formId={FORM_ID} submitCallback={handleSubmit} disabled={disabled} />
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
                Создать
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
