import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { CreateButton } from '@/app/components/buttons/create-button.tsx';
import { DeleteButton } from '@/app/components/buttons/delete-button.tsx';
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
import { Typography } from '@/app/components/ui/typography.tsx';
import { NOTE_TYPES, type NoteType } from '@/entities/notes/types.ts';
import { transformToOptions } from '@/lib/utils.ts';

interface Props {
  submitCallback: (data: ProjectNoteSchema) => void;
  disabled: boolean;
  formId: string;
}

const DEFAULT_FIELDS = {
  title: '',
  value: '',
};

export const ProjectNoteForm = ({ disabled, formId, submitCallback }: Props) => {
  const form = useFormContext<ProjectNoteSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'records',
  });

  const handleChangeRecordType = (value: string) => {
    const noteType = value as NoteType;
    form.setValue('type', noteType);

    if (noteType === 'NOTE') {
      return form.setValue('records', []);
    }

    const currentRecords = form.getValues('records');
    form.setValue('note', undefined);
    form.setValue('records', currentRecords.length > 0 ? currentRecords : [DEFAULT_FIELDS]);
  };

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(submitCallback)}
      className={'mx-auto flex flex-col gap-6'}
    >
      <Controller
        name='type'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation='vertical' data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={'create_note_form_type'}>
              Тип заметки <Asterisk />
            </FieldLabel>

            <Select name={field.name} value={field.value} onValueChange={handleChangeRecordType}>
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
        ) : (
          <>
            <Controller
              name='groupTitle'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='create_note_form_title'>
                    Название группы <Asterisk />
                  </FieldLabel>
                  <Input
                    {...field}
                    id='create_note_form_title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Пример: Dev'
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className={'flex flex-col gap-6'}>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className='flex flex-col gap-4 rounded-lg border border-theme/20 p-4'
                >
                  <div className={'flex items-center justify-between'}>
                    <Typography>{index + 1}.</Typography>

                    <DeleteButton
                      className={''}
                      onClick={() => remove(index)}
                      disabled={disabled}
                    />
                  </div>

                  <Controller
                    name={`records.${index}.title`}
                    control={form.control}
                    disabled={disabled}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className={'text-muted-foreground'}
                          htmlFor={`create_note_form_records_${index}_title`}
                        >
                          Название <Asterisk />
                        </FieldLabel>
                        <Input
                          {...field}
                          id={`create_note_form_records_${index}_title`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Пример: login'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`records.${index}.value`}
                    control={form.control}
                    disabled={disabled}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          className={'text-muted-foreground'}
                          htmlFor={`create_note_form_records_${index}_value`}
                        >
                          Значение <Asterisk />
                        </FieldLabel>
                        <Input
                          {...field}
                          id={`create_note_form_records_${index}_value`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Пример: qwerty'
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              ))}

              <CreateButton
                className={'ml-auto'}
                onClick={() => append(DEFAULT_FIELDS)}
                disabled={disabled}
              >
                Добавить подгруппу
              </CreateButton>
            </div>
          </>
        )}
      </FieldGroup>
    </form>
  );
};
