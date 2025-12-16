import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';

import { type AuthSchema, authSchema } from '@/app/components/auth/autn.schema.ts';
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
import { Typography } from '@/app/components/ui/typography.tsx';
import { useLogin } from '@/entities/auth/hooks.ts';

export const LoginForm = () => {
  const loginMutation = useLogin();

  const disabled = loginMutation.isPending;

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: AuthSchema) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader className={'text-center'}>
        <CardTitle>Вход</CardTitle>
        <CardDescription>Войдите в приложение</CardDescription>
      </CardHeader>

      <CardContent className={'mb-6'}>
        <form
          id={'login_form'}
          className={'flex flex-col gap-6'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FieldGroup>
            <Controller
              name='email'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='login_form_email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='login_form_email'
                    aria-invalid={fieldState.invalid}
                    placeholder='JohnDoe@mail.com'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name='password'
              control={form.control}
              disabled={disabled}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='login_form_password'>Password</FieldLabel>
                  <Input
                    {...field}
                    id='login_form_password'
                    aria-invalid={fieldState.invalid}
                    placeholder='password'
                    autoComplete='off'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Typography variant={'small'} className={'flex items-center justify-end gap-2'}>
            Еще нет аккаунта?
            <Link className={'text-[#1447E6FF]'} to='/register'>
              Зарегистрироваться
            </Link>
          </Typography>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation='horizontal' className={'justify-end'}>
          <Button type='button' variant='outline' onClick={() => form.reset()} disabled={disabled}>
            Сбросить
          </Button>
          <Button type='submit' form='login_form' disabled={disabled} loading={disabled}>
            Войти
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
