import { Controller, useFormContext } from 'react-hook-form';

import type { ProjectNoteSchema } from '@/app/components/pages/current-project/tabs/project-notes-tab/schema.ts';
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
import { NOTE_TYPES } from '@/entities/notes/types.ts';
import { transformToOptions } from '@/lib/utils.ts';

interface Props {
  submitCallback: (data: ProjectNoteSchema) => void;
  disabled: boolean;
  formId: string;
}

export const ProjectNoteForm = ({ disabled, formId, submitCallback }: Props) => {
  const form = useFormContext<ProjectNoteSchema>();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(submitCallback)}
      className={'flex flex-col gap-6'}
    >
      <Controller
        name='type'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation='vertical' data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={'create_note_form_type'}>
              Тип заметки <Asterisk />
            </FieldLabel>

            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id='create_note_form_type'
                aria-invalid={fieldState.invalid}
                className='min-w-[120px]'
              >
                <SelectValue placeholder='Выберите тип заметки' />
              </SelectTrigger>

              <SelectContent>
                {transformToOptions(NOTE_TYPES).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <FieldGroup>
        {form.watch('type') === 'NOTE' ? (
          <>
            <Controller
              name='title'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='create_note_form_title'>
                    Название <Asterisk />
                  </FieldLabel>
                  <Input
                    {...field}
                    id='create_note_form_title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Пример: Данные для входа'
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='note'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='create_note_form_note'>Текст заметки</FieldLabel>
                  <Textarea
                    className={'h-[100px] resize-none'}
                    {...field}
                    id='create_note_form_note'
                    aria-invalid={fieldState.invalid}
                    placeholder='Например:
                                  https://mineralsmail.dev-relabs.ru/
                                  login user
                                  pass 1Qwertyu'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </>
        ) : (
          <>
            <Controller
              name='title'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='create_note_form_title'>
                    Название <Asterisk />
                  </FieldLabel>
                  <Input
                    {...field}
                    id='create_note_form_title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Пример: Password'
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='value'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='create_note_form_value'>
                    Значение <Asterisk />
                  </FieldLabel>
                  <Input
                    {...field}
                    id='create_note_form_value'
                    aria-invalid={fieldState.invalid}
                    placeholder='Пример: qwert'
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </>
        )}
      </FieldGroup>
    </form>
  );
};
