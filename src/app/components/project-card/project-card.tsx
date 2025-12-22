import { Link } from '@tanstack/react-router';

import { ProjectStatusBadge } from '@/app/components/project-status-badge/project-status-badge.tsx';
import { Button } from '@/app/components/ui/button.tsx';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/app/components/ui/item.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import type { Project } from '@/entities/projects/types.ts';
import { formatDate, hexToRgba } from '@/lib/utils.ts';

interface Props {
  project: Project;
  className?: string;
}

export const ProjectCard = ({ project, className }: Props) => {
  return (
    <Item
      key={project.id}
      variant='outline'
      className={className}
      style={{ background: project.color ? hexToRgba(project.color) : 'transparent' }}
    >
      <ItemContent>
        <div className={'flex items-center gap-4'}>
          <ItemTitle>{project.name}</ItemTitle>
          <Typography variant={'muted'}>{formatDate(project.createdAt)}</Typography>

          <ProjectStatusBadge status={project.projectStatus} />
        </div>
        <ItemDescription>{project.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Link to={'/projects/$projectId'} params={{ projectId: project.id }}>
          <Button variant='outline' size='sm'>
            Подробнее
          </Button>
        </Link>
      </ItemActions>
    </Item>
  );
};
