import { FolderCode } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { CreateProjectNoteModal } from '@/app/components/pages/current-project/tabs/project-notes-tab/create-project-note-modal.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card.tsx';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/app/components/ui/empty.tsx';
import { Field } from '@/app/components/ui/field.tsx';
import { Separator } from '@/app/components/ui/separator.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import type { Project } from '@/entities/projects/types.ts';
import { hexToRgba } from '@/lib/utils.ts';

interface Props {
  project: Project;
  className?: string;
}

export const ProjectNotesTab = ({ project, className }: Props) => {
  return (
    <Card className={twMerge('flex flex-col gap-6', className)}>
      <CardHeader>
        <div className={'flex items-start justify-between'}>
          <CardTitle>
            <Typography tag={'span'} variant={'headline-3'}>
              {project.name}
            </Typography>
          </CardTitle>

          <CreateProjectNoteModal projectId={project.id} />
        </div>

        <CardDescription>
          Данные доступа и заметки по проекту. Используйте для учётных записей, токенов и параметров
          окружения.
        </CardDescription>
      </CardHeader>

      <Separator style={{ background: hexToRgba(project.color ?? 'var(--color-border)') }} />

      <CardContent className={'flex flex-col gap-4'}>
        {project.notes.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant='icon'>
                <FolderCode />
              </EmptyMedia>
              <EmptyTitle>В проекте пока нет заметок</EmptyTitle>
              <EmptyDescription>
                Добавьте первую запись: аккаунт, пароль, токен или заметку для проекта «
                {project.name}».
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className='flex gap-2'>
                <CreateProjectNoteModal projectId={project.id}>
                  Добавить заметку
                </CreateProjectNoteModal>
              </div>
            </EmptyContent>
          </Empty>
        )}

        {project.notes.map((note) => (
          <p>{note.id}</p>
        ))}
      </CardContent>

      <CardFooter>
        <Field orientation='horizontal' className={'justify-end'}>
          <CreateProjectNoteModal projectId={project.id}>Добавить заметку</CreateProjectNoteModal>
        </Field>
      </CardFooter>
    </Card>
  );
};
