import { FolderCode } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { LinkCard } from '@/app/components/note-card/link-card.tsx';
import { CreateProjectLinkModal } from '@/app/components/pages/current-project/tabs/project-links-tab/create-project-link-modal.tsx';
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

export const ProjectLinksTab = ({ project }: Props) => {
  return (
    <Card className={twMerge('flex flex-col gap-6')}>
      <CardHeader>
        <div className={'flex items-start justify-between'}>
          <CardTitle>
            <Typography tag={'span'} variant={'headline-3'}>
              {project.name}
            </Typography>
          </CardTitle>

          <CreateProjectLinkModal projectId={project.id} />
        </div>

        <CardDescription>Cсылки для проекта</CardDescription>
      </CardHeader>

      <Separator style={{ background: hexToRgba(project.color ?? 'var(--color-border)') }} />

      <CardContent className={'flex flex-col gap-4'}>
        {project.links.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant='icon'>
                <FolderCode />
              </EmptyMedia>
              <EmptyTitle>В проекте пока нет ссылок</EmptyTitle>
              <EmptyDescription>
                Добавьте первую ссылку, чтобы начать работу с проектом «{project.name}».
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className='flex gap-2'>
                <CreateProjectLinkModal projectId={project.id}>
                  Добавить ссылку
                </CreateProjectLinkModal>
              </div>
            </EmptyContent>
          </Empty>
        )}

        {project.links.length > 0 && (
          <div className={'flex flex-col gap-3'}>
            {project.links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Field orientation='horizontal' className={'justify-end'}>
          <CreateProjectLinkModal projectId={project.id}>Добавить ссылку</CreateProjectLinkModal>
        </Field>
      </CardFooter>
    </Card>
  );
};
