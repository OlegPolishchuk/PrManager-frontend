import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
} from '@/app/components/ui/dialog.tsx';
import { Field } from '@/app/components/ui/field.tsx';
import { ScrollArea } from '@/app/components/ui/scroll-area.tsx';
import { useUpdateProjectLink } from '@/entities/project-link/hooks.ts';
import type { ProjectLink } from '@/entities/project-link/types.ts';

const FORM_ID = 'project-link-create-form';

interface Props {
  open: boolean;
  link: ProjectLink;
  onOpenChange: (open: boolean) => void;
}

export const UpdateProjectLinkModal = ({ link, open, onOpenChange }: Props) => {
  const form = useForm<ProjectLinkSchema>({
    resolver: zodResolver(projectLinkSchema),
    defaultValues: {
      url: link.url,
      type: link.type,
      title: link.title,
      description: link.description || '',
      projectId: link.projectId,
    },
  });
  const updateLinkMutation = useUpdateProjectLink();
  const disabled = updateLinkMutation.isPending;

  const handleSubmit = (data: ProjectLinkSchema) => {
    console.log(data);
    const updatedLinkData = { id: link.id, ...data };
    updateLinkMutation.mutate(updatedLinkData, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/*<DialogTrigger asChild>*/}
        {/*  <EditButton className={twMerge('w-full justify-between', className)}>*/}
        {/*    Редактировать*/}
        {/*  </EditButton>*/}
        {/*</DialogTrigger>*/}
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
                Сохранить
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
