import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { Button } from '@/app/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card.tsx';
import { Field, FieldError, FieldLabel } from '@/app/components/ui/field.tsx';
import { PasswordInput } from '@/app/components/ui/password-input.tsx';
import { useUpdatePassword } from '@/entities/profile/hooks.ts';
import { REQUIRED_MESSAGE } from '@/lib/constants.ts';
import { extractAxiosError } from '@/lib/utils.ts';

const passwordFormSchema = z
  .object({
    id: z.string(),
    password: z.string().nonempty({ message: REQUIRED_MESSAGE }),
    newPassword: z.string({ message: REQUIRED_MESSAGE }).min(3, { message: 'Минимум 3 символа' }),
    newPasswordConfirm: z
      .string({ message: REQUIRED_MESSAGE })
      .min(3, { message: 'Минимум 3 символа' }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Пароли не совпадают',
        path: ['newPassword'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Пароли не совпадают',
        path: ['newPasswordConfirm'],
      });
    }
  });

type PasswordFormData = z.infer<typeof passwordFormSchema>;

export const ProfilePasswordForm = ({ userId }: { userId: string }) => {
  const form = useForm<PasswordFormData>({
    defaultValues: {
      id: userId,
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    resolver: zodResolver(passwordFormSchema),
  });

  const updatePasswordMutation = useUpdatePassword();
  const disabled = updatePasswordMutation.isPending;

  const handleSubmit = (data: PasswordFormData) => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success('Пароль успешно обновлен!');
      },
      onError: (err) => {
        const error = extractAxiosError(err);
        if (error.message === 'Wrong Password') {
          form.setError('password', { message: 'Неверный пароль!' });
        }
      },
    });
  };

  return (
    <Card className={'mx-auto w-full'}>
      <CardHeader className={'text-center'}>
        <CardTitle>Смена пароля</CardTitle>
        <CardDescription>Можете в любой момент сменить ваш пароль</CardDescription>
      </CardHeader>

      <CardContent className={'mb-6'}>
        <form
          id={'profile_form_password'}
          className={twMerge('flex flex-col gap-6', 'gap-6 md:flex-row')}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Controller
            name='password'
            control={form.control}
            disabled={disabled}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='login_form_email'>Текущий пароль</FieldLabel>
                <PasswordInput
                  {...field}
                  id='login_form_email'
                  aria-invalid={fieldState.invalid}
                  placeholder='Текущий пароль'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='newPassword'
            control={form.control}
            disabled={disabled}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='login_form_email'>Новый пароль</FieldLabel>
                <PasswordInput
                  {...field}
                  id='login_form_email'
                  aria-invalid={fieldState.invalid}
                  placeholder='Новый пароль'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='newPasswordConfirm'
            control={form.control}
            disabled={disabled}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='login_form_email'>Повторите новый пароль</FieldLabel>
                <PasswordInput
                  {...field}
                  id='login_form_email'
                  aria-invalid={fieldState.invalid}
                  placeholder='Новый пароль'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation='horizontal' className={'justify-end'}>
          <Button type='button' variant='outline' onClick={() => form.reset()} disabled={disabled}>
            Сбросить
          </Button>
          <Button type='submit' form='profile_form_password' disabled={disabled} loading={disabled}>
            Сменить пароль
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
