import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Separator } from '@/app/components/ui/separator.tsx';
import { useCreateNote } from '@/entities/notes/hooks.tsx';

const FORM_ID = 'project-link-create-form';

export const Route = createFileRoute('/_authenticated/projects/$projectId/note/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();

  const form = useForm<ProjectNoteSchema>({
    resolver: zodResolver(projectNoteSchema),
    defaultValues: {
      groupTitle: '',
      projectId,
      type: 'CREDENTIALS',
      records: [{ title: '', value: '' }],
      links: [],
    },
  });
  const createNoteMutation = useCreateNote();
  const disabled = createNoteMutation.isPending;

  const handleSubmit = (data: ProjectNoteSchema) => {
    console.log(data);

    createNoteMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        navigate({ to: '/projects/$projectId', params: { projectId }, search: { tab: 'notes' } });
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
              <Button
                type='button'
                variant='outline'
                onClick={() => form.reset()}
                disabled={disabled}
              >
                Отменить
              </Button>

              <Button type='submit' form={FORM_ID} disabled={disabled} loading={disabled}>
                Добавить
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </FormProvider>
    </div>
  );
}
