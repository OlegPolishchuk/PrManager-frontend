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

interface Props {
  className?: string;
  submitCallback: (data: ProjectSchema) => void;
  disabled?: boolean;
}

export const NewProjectFormCard = ({ submitCallback, className, disabled }: Props) => {
  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      projectStatus: 'ACTIVE_DEVELOPMENT',
      color: '#79B8FF',
      icon: undefined,
    },
  });

  return (
    <FormProvider {...form}>
      <Card className={twMerge('mx-auto w-full', className)}>
        <CardHeader className={'text-center'}>
          <CardTitle>Новый проект</CardTitle>
          <CardDescription>Создайте нвоый проект</CardDescription>
        </CardHeader>

        <CardContent className={'mb-6'}>
          <ProjectForm submitCallback={submitCallback} formId={'profile_form_password'} />
        </CardContent>

        <CardFooter>
          <Field orientation='horizontal' className={'justify-end'}>
            <Button
              type='button'
              variant='outline'
              onClick={() => form.reset()}
              disabled={disabled}
            >
              Сбросить
            </Button>
            <Button
              type='submit'
              form='profile_form_password'
              disabled={disabled}
              loading={disabled}
            >
              Создать
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </FormProvider>
  );
};
