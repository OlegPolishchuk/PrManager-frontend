import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { CopyButton } from '@/app/components/buttons/copy-button.tsx';
import { type ProjectSchema } from '@/app/components/pages/projects/project.schema.ts';
import { Asterisk } from '@/app/components/ui/asterisk.tsx';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/app/components/ui/field.tsx';
import { Input } from '@/app/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select';
import { SelectTrigger } from '@/app/components/ui/select.tsx';
import { Textarea } from '@/app/components/ui/textarea.tsx';
import { PROJECT_STATUS } from '@/entities/projects/types.ts';
import { transformToOptions } from '@/lib/utils.ts';

interface Props {
  className?: string;
  submitCallback: (data: ProjectSchema) => void;
  disabled?: boolean;
  formId: string;
}

export const ProjectForm = ({ className, formId, submitCallback, disabled }: Props) => {
  const form = useFormContext<ProjectSchema>();

  return (
    <form
      id={formId}
      className={twMerge('flex flex-col gap-6', 'gap-6 md:flex-row', className)}
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
              <FieldLabel htmlFor='create_project_form_description'>Описание проекта</FieldLabel>
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
                  <Input {...field} />

                  <CopyButton value={field.value ?? ''} />
                </div>
              </div>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};
