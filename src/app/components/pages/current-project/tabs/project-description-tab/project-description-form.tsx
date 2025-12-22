import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';

import {
  type ProjectSchema,
  projectSchema,
} from '@/app/components/pages/projects/project.schema.ts';
import { ProjectForm } from '@/app/components/pages/projects/project-form.tsx';
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
import { useUpdateProject } from '@/entities/projects/hooks.ts';
import type { Project } from '@/entities/projects/types.ts';
import { DEFAULT_PROJECT_COLOR } from '@/lib/constants.ts';
import { hexToRgba } from '@/lib/utils.ts';

interface Props {
  project: Project;
  className?: string;
  submitCallback?: () => void;
  canselCallback?: () => void;
}

export const ProjectDescriptionForm = ({ project, className, canselCallback }: Props) => {
  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      color: project.color || DEFAULT_PROJECT_COLOR,
      projectStatus: project.projectStatus,
    },
  });

  const updateProjectMutation = useUpdateProject();
  const isLoading = updateProjectMutation.isPending;
  const disabled = isLoading || !form.formState.isDirty;

  const handleCancel = () => {
    form.reset();

    if (canselCallback) {
      canselCallback();
    }
  };

  const handleSubmit = (data: ProjectSchema) => {
    console.log('data =>', data);

    updateProjectMutation.mutate(
      {
        id: project.id,
        ...data,
      },
      {
        onSuccess: () => {
          if (canselCallback) {
            canselCallback();
          }
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      <Card className={twMerge('flex flex-col gap-6', className)}>
        <CardHeader className='text-center'>
          <CardTitle>Редактирование проекта «{project.name}»</CardTitle>
          <CardDescription>
            Обновите данные проекта и нажмите «Сохранить», чтобы применить изменения.
          </CardDescription>
        </CardHeader>

        <Separator style={{ background: hexToRgba(project.color ?? 'var(--color-border)') }} />

        <CardContent className={'mb-10 flex flex-col gap-4'}>
          <ProjectForm submitCallback={handleSubmit} formId={'project-description-form'} />
        </CardContent>

        <CardFooter>
          <Field orientation='horizontal' className={'justify-end'}>
            <Button type='button' variant='outline' onClick={handleCancel} disabled={isLoading}>
              Отменить
            </Button>
            <Button
              type='submit'
              form='project-description-form'
              disabled={disabled}
              loading={isLoading}
            >
              Сохранить
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};
