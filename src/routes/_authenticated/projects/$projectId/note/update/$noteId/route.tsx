import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-separator';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

import { ProjectNoteForm } from '@/app/components/pages/current-project/tabs/project-notes-tab/project-note-form.tsx';
import {
  type ProjectNoteSchema,
  projectNoteSchema,
} from '@/app/components/pages/current-project/tabs/project-notes-tab/schema.ts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb.tsx';
import { Button } from '@/app/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card.tsx';
import { Field } from '@/app/components/ui/field.tsx';
import { getProjectNoteQueryOptions, useUpdateNote } from '@/entities/notes/hooks.tsx';
import type { UpdateNoteRequestFields } from '@/entities/notes/types.ts';

const FORM_ID = 'project-link-update-form';

export const Route = createFileRoute('/_authenticated/projects/$projectId/note/update/$noteId')({
  component: EditNotePage,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(
      getProjectNoteQueryOptions(params.projectId, params.noteId),
    );
  },
});

function EditNotePage() {
  const navigate = useNavigate();
  const { projectId, noteId } = Route.useParams();

  const noteRequest = useSuspenseQuery(getProjectNoteQueryOptions(projectId, noteId));
  const note = noteRequest.data.data;

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

  const updateMutation = useUpdateNote();
  const isLoading = updateMutation.isPending;
  const disabled = isLoading || !form.formState.isDirty;

  const handleSubmit = (data: ProjectNoteSchema) => {
    const updateRequestFields: UpdateNoteRequestFields = {
      noteId: note.id,
      ...data,
    };

    updateMutation.mutate(updateRequestFields, {
      onSuccess: () => {
        form.reset();
        navigate({
          to: '/projects/$projectId',
          params: { projectId: data.projectId },
          search: { tab: 'notes' },
        });
      },
    });
  };

  return (
    <div className={'flex flex-col gap-6'}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator className={'rotate-180'} />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/projects/$projectId`} params={{ projectId }} search={{ tab: 'notes' }}>
                Вернуться назад
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <FormProvider {...form}>
        <Card className={twMerge('mx-auto w-full')}>
          <CardHeader className={'text-center'}>
            <CardTitle>Новая заметка</CardTitle>

            <CardDescription>
              Выберите тип заметки. Для «Заметка» — заполните текст, для остальных типов — добавьте
              название и данные.
            </CardDescription>
          </CardHeader>

          <Separator className={'h-[1px] bg-border'} />

          <CardContent className={'mb-6'}>
            <ProjectNoteForm formId={FORM_ID} submitCallback={handleSubmit} disabled={disabled} />
          </CardContent>

          <CardFooter>
            <Field orientation='horizontal' className={'min-h-[38px] justify-end'}>
              <Link to={`/projects/$projectId`} params={{ projectId }} search={{ tab: 'notes' }}>
                <Button type='button' variant='outline' onClick={() => form.reset()}>
                  Отменить
                </Button>
              </Link>

              <Button type='submit' form={FORM_ID} disabled={disabled} loading={isLoading}>
                Сохранить
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </FormProvider>
    </div>
  );
}
