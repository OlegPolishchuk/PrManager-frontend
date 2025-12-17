import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';

import { CopyButton } from '@/app/components/buttons/copy-button.tsx';
import {
  type ProjectSchema,
  projectSchema,
} from '@/app/components/pages/projects/project.schema.ts';
import { Asterisk } from '@/app/components/ui/asterisk.tsx';
import { Button } from '@/app/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card.tsx';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/app/components/ui/field.tsx';
import { Input } from '@/app/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select';
import { SelectTrigger } from '@/app/components/ui/select.tsx';
import { Textarea } from '@/app/components/ui/textarea.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import { type Project, PROJECT_STATUS } from '@/entities/projects/types.ts';
import { transformToOptions } from '@/lib/utils.ts';

interface Props {
  className?: string;
  project?: Project;
  submitCallback: (data: ProjectSchema) => void;
  disabled?: boolean;
}

export const ProjectForm = ({ className, project, submitCallback, disabled }: Props) => {
  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      projectStatus: project?.projectStatus || 'ACTIVE_DEVELOPMENT',
      color: project?.color || '#79B8FF',
      icon: project?.icon || undefined,
    },
  });

  return (
    <Card className={twMerge('mx-auto w-full', className)}>
      <CardHeader className={'text-center'}>
        <CardTitle>Новый проект</CardTitle>
        <CardDescription>Создайте нвоый проект</CardDescription>
      </CardHeader>

      <CardContent className={'mb-6'}>
        <form
          id={'profile_form_password'}
          className={twMerge('flex flex-col gap-6', 'gap-6 md:flex-row')}
          onSubmit={form.handleSubmit(submitCallback)}
        >
          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='create_project_form_name'>
                    Название проекта <Asterisk />
                  </FieldLabel>
                  <Input
                    {...field}
                    id='create_project_form_name'
                    aria-invalid={fieldState.invalid}
                    placeholder='Название проекта'
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='description'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='create_project_form_description'>
                    Описание проекта
                  </FieldLabel>
                  <Textarea
                    className={'h-[150px] resize-none'}
                    {...field}
                    id='create_project_form_description'
                    aria-invalid={fieldState.invalid}
                    placeholder='Описание проекта'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name='projectStatus'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation='vertical' data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={'create_project_form_project_status'}>
                    Статус проекта <Asterisk />
                  </FieldLabel>

                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id='create_project_form_project_status'
                      aria-invalid={fieldState.invalid}
                      className='min-w-[120px]'
                    >
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>

                    <SelectContent>
                      {transformToOptions(PROJECT_STATUS).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name='color'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation='vertical' data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={'create_project_form_project_status'}>Цвет</FieldLabel>

                  <div className={'flex items-center gap-4'}>
                    <Input {...field} type={'color'} className={'w-[100px]!'} />

                    <div className={'flex items-center gap-2'}>
                      <Typography>{field.value}</Typography>
                      <CopyButton value={field.value ?? ''} />
                    </div>
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation='horizontal' className={'justify-end'}>
          <Button type='button' variant='outline' onClick={() => form.reset()} disabled={disabled}>
            Сбросить
          </Button>
          <Button type='submit' form='profile_form_password' disabled={disabled} loading={disabled}>
            Создать
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
