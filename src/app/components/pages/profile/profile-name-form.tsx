import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, PencilOff, Save } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { Button } from '@/app/components/ui/button.tsx';
import { Field, FieldError, FieldGroup } from '@/app/components/ui/field.tsx';
import { Input } from '@/app/components/ui/input.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import { useUpdateProfile } from '@/entities/profile/hooks.ts';

interface Props {
  className?: string;
  username: string;
  userId: string;
}

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Минимальное количество символов 3' }),
});

export const ProfileNameForm = ({ className, userId, username }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const updateProfileMutation = useUpdateProfile();
  const disabled = updateProfileMutation.isPending;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userId,
      name: username,
    },
  });

  const handleCloseForm = () => {
    setEditMode(false);
    form.reset();
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setEditMode(false);
        toast.success('Profile name successfully updated!');
      },
    });
  };

  return (
    <div className={twMerge('w-full', className)}>
      {editMode ? (
        <form
          id={'profile_name_form'}
          className={'flex items-center md:items-start'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FieldGroup className={'relative flex items-center justify-center! md:items-start'}>
            <Controller
              name='name'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={'items-center justify-center gap-1 md:items-start'}
                  >
                    <div className={'relative flex w-fit! items-center'}>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder='name'
                        className={'w-fit pr-[45px]'}
                        disabled={disabled}
                      />

                      <Button
                        form={'profile_name_form'}
                        type={'submit'}
                        variant={'ghost'}
                        className={
                          'absolute right-0 cursor-pointer transition-all hover:text-destructive'
                        }
                        disabled={disabled}
                      >
                        <Save />
                      </Button>

                      <Button
                        variant={'ghost'}
                        className={'absolute right-[-50px]'}
                        onClick={handleCloseForm}
                        disabled={disabled}
                      >
                        <PencilOff />
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className={'text-center'} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      ) : (
        <div
          className={
            'relative mx-auto flex min-h-[36px] w-fit items-center gap-2 md:mx-0 md:items-start'
          }
        >
          <Typography variant={'headline-4'} tag={'h1'}>
            {username}
          </Typography>

          <Button
            variant={'ghost'}
            className={'group absolute right-[-50px]'}
            onClick={() => {
              setEditMode(true);
            }}
          >
            <Pencil className={'transition-all group-hover:text-destructive'} />
          </Button>
        </div>
      )}
    </div>
  );
};
