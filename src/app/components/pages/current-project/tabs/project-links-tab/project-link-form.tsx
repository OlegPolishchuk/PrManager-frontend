import { Controller, useFormContext } from 'react-hook-form';
import z from 'zod';

import { Asterisk } from '@/app/components/ui/asterisk.tsx';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/app/components/ui/field.tsx';
import { Input } from '@/app/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select.tsx';
import { Textarea } from '@/app/components/ui/textarea.tsx';
import { LINK_TYPES } from '@/entities/project-link/types.ts';
import { REQUIRED_MESSAGE } from '@/lib/constants.ts';
import { transformToOptions } from '@/lib/utils.ts';

export const projectLinkSchema = z.object({
  title: z
    .string()
    .nonempty({ message: REQUIRED_MESSAGE })
    .min(2, { message: 'Минимальное кол-во симвобов 2' }),

  description: z.string().optional(),
  url: z.string().url({ message: 'Невалидный URL' }),
  type: z.enum(['REPO', 'FIGMA', 'DEV', 'PROD', 'DOCS', 'OTHER']),
  projectId: z.string({ message: REQUIRED_MESSAGE }),
});

export type ProjectLinkSchema = z.infer<typeof projectLinkSchema>;

interface Props {
  submitCallback: (data: ProjectLinkSchema) => void;
  disabled: boolean;
  formId: string;
}

export const ProjectLinkForm = ({ disabled, formId, submitCallback }: Props) => {
  const form = useFormContext<ProjectLinkSchema>();

  return (
    <form id={formId} onSubmit={form.handleSubmit(submitCallback)}>
      <FieldGroup>
        <Controller
          name='url'
          control={form.control}
          disabled={disabled}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='create_project_form_name'>
                URL <Asterisk />
              </FieldLabel>
              <Textarea
                className={'h-[100px] resize-none'}
                {...field}
                id='create_project_form_description'
                aria-invalid={fieldState.invalid}
                placeholder='Пример: https://gitlab.com'
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='title'
          control={form.control}
          disabled={disabled}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='create_project_form_name'>Название ссылки</FieldLabel>
              <Input
                {...field}
                id='create_project_form_name'
                aria-invalid={fieldState.invalid}
                placeholder='Пример: Гитлаб'
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='type'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation='vertical' data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={'create_project_form_project_status'}>
                Тип ссылки <Asterisk />
              </FieldLabel>

              <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id='create_project_form_project_status'
                  aria-invalid={fieldState.invalid}
                  className='min-w-[120px]'
                >
                  <SelectValue placeholder='Тип ссылки' />
                </SelectTrigger>

                <SelectContent>
                  {transformToOptions(LINK_TYPES).map((option) => (
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
          name='description'
          control={form.control}
          disabled={disabled}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='create_project_form_description'>Описание</FieldLabel>
              <Textarea
                className={'h-[100px] resize-none'}
                {...field}
                id='create_project_form_description'
                aria-invalid={fieldState.invalid}
                placeholder='Описание'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};
