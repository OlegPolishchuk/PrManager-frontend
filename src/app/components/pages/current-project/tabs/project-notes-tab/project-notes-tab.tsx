import { useNavigate } from '@tanstack/react-router';
import { FolderCode } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { CreateButton } from '@/app/components/buttons/create-button.tsx';
import { NoteCard } from '@/app/components/link-card/note-card.tsx';
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
import { type Note, NOTE_TYPES, type NoteType } from '@/entities/notes/types.ts';
import type { Project } from '@/entities/projects/types.ts';
import { hexToRgba } from '@/lib/utils.ts';

interface Props {
  project: Project;
  className?: string;
}

type MappedNotes = Record<NoteType, Note[]>;

export const ProjectNotesTab = ({ project, className }: Props) => {
  const navigate = useNavigate();

  const notes = project.notes;

  const mappedNotes: MappedNotes = {
    CREDENTIALS: [],
    NOTE: [],
    ENVIRONMENT: [],
    PAYMENT_TEST: [],
  };

  const preparedNotes = [...notes].reduce((acc, note) => {
    if (!acc[note.type]) acc[note.type] = [];
    acc[note.type].push(note);

    return acc;
  }, mappedNotes);

  const handleRedirectToCreatePage = () => {
    navigate({ to: `/projects/${project.id}/note/create` });
  };

  return (
    <Card className={twMerge('flex flex-col gap-6', className)}>
      <CardHeader>
        <div className={'flex items-start justify-between'}>
          <CardTitle>
            <Typography tag={'span'} variant={'headline-3'}>
              {project.name}
            </Typography>
          </CardTitle>

          <CreateButton className={className} onClick={handleRedirectToCreatePage} />
        </div>

        <CardDescription>
          Данные доступа и заметки по проекту. Используйте для учётных записей, токенов и параметров
          окружения.
        </CardDescription>
      </CardHeader>

      <Separator style={{ background: hexToRgba(project.color ?? 'var(--color-border)') }} />

      <CardContent className={'flex flex-col gap-10'}>
        {mappedNotes.CREDENTIALS.length > 0 && (
          <div>
            <Typography variant={'small'} className={'mb-4'}>
              {NOTE_TYPES.CREDENTIALS}
            </Typography>

            <div className={'flex flex-col gap-4'}>
              {preparedNotes.CREDENTIALS.map((note) => {
                return <NoteCard key={note.id} note={note} />;
              })}
            </div>
          </div>
        )}

        {mappedNotes.NOTE.length > 0 && (
          <div>
            <Typography variant={'small'} className={'mb-4'}>
              {NOTE_TYPES.NOTE}
            </Typography>

            <div className={'flex flex-col gap-4'}>
              {preparedNotes.NOTE.map((note) => {
                return <NoteCard note={note} />;
              })}
            </div>
          </div>
        )}

        {mappedNotes.ENVIRONMENT.length > 0 && (
          <div>
            <Typography variant={'small'} className={'mb-4'}>
              {NOTE_TYPES.ENVIRONMENT}
            </Typography>

            <div className={'flex flex-col gap-4'}>
              {preparedNotes.ENVIRONMENT.map((note) => {
                return <NoteCard key={note.id} note={note} />;
              })}
            </div>
          </div>
        )}

        {mappedNotes.PAYMENT_TEST.length > 0 && (
          <div>
            <Typography variant={'small'} className={'mb-4'}>
              {NOTE_TYPES.PAYMENT_TEST}
            </Typography>

            <div className={'flex flex-col gap-4'}>
              {preparedNotes.PAYMENT_TEST.map((note) => {
                return <NoteCard key={note.id} note={note} />;
              })}
            </div>
          </div>
        )}

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
                <CreateButton className={className} onClick={handleRedirectToCreatePage}>
                  Добавить заметку
                </CreateButton>
              </div>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>

      <CardFooter>
        <Field orientation='horizontal' className={'justify-end'}>
          <CreateButton className={className} onClick={handleRedirectToCreatePage}>
            Добавить заметку
          </CreateButton>
        </Field>
      </CardFooter>
    </Card>
  );
};
