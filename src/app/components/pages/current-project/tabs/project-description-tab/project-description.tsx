import { twMerge } from 'tailwind-merge';

import { DeleteButton } from '@/app/components/buttons/delete-button.tsx';
import { EditButton } from '@/app/components/buttons/edit-button.tsx';
import { ProjectStatusBadge } from '@/app/components/project-status-badge/project-status-badge.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card.tsx';
import { Field } from '@/app/components/ui/field.tsx';
import { Separator } from '@/app/components/ui/separator.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import { type Project } from '@/entities/projects/types.ts';
import { formatDate, hexToRgba } from '@/lib/utils.ts';

interface Props {
  project: Project;
  className?: string;
  clickCallback: () => void;
}

export const ProjectDescription = ({ project, className, clickCallback }: Props) => {
  return (
    <Card className={twMerge('flex flex-col gap-6', className)}>
      <CardHeader>
        <div className={'flex min-h-[36px] items-start justify-between'}>
          <CardTitle>
            <Typography variant={'headline-3'}>{project.name}</Typography>
          </CardTitle>
        </div>

        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <Separator style={{ background: hexToRgba(project.color ?? 'var(--color-border)') }} />

      <CardContent className={'mb-10 flex flex-col gap-4'}>
        <div className={'flex items-center justify-between'}>
          <Typography variant={'muted'}>Статус:</Typography>
          <Typography variant={'small'}>
            <ProjectStatusBadge status={project.projectStatus} />
          </Typography>
        </div>

        <div className={'flex items-center justify-between'}>
          <Typography variant={'muted'}>Количество ссылок:</Typography>
          <Typography variant={'small'}>{project.links.length}</Typography>
        </div>

        <div className={'flex items-center justify-between'}>
          <Typography variant={'muted'}>Заметки:</Typography>
          <Typography variant={'small'}>{project.notes.length}</Typography>
        </div>

        <div className={'flex items-center justify-between'}>
          <Typography variant={'muted'}>Создан:</Typography>
          <Typography variant={'small'}>{formatDate(project.createdAt)}</Typography>
        </div>

        <div className={'flex items-center justify-between'}>
          <Typography variant={'muted'}>Обновлен:</Typography>
          <Typography variant={'small'}>{formatDate(project.updatedAt)}</Typography>
        </div>
      </CardContent>

      <CardFooter>
        <Field orientation='horizontal' className={'justify-end'}>
          <EditButton onClick={clickCallback}>Редактировать</EditButton>

          <DeleteButton>Удалить проект</DeleteButton>
        </Field>
      </CardFooter>
    </Card>
  );
};
