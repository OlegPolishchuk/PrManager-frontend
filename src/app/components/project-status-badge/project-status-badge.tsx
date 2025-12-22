import { twMerge } from 'tailwind-merge';

import { Badge } from '@/app/components/ui/badge.tsx';
import { PROJECT_STATUS, type ProjectStatus } from '@/entities/projects/types.ts';

interface Props {
  className?: string;
  status: ProjectStatus;
}

const badgeClassNames: Record<ProjectStatus, string> = {
  ACTIVE_DEVELOPMENT: 'border-[oklch(57.7%_0.245_27.325)] text-[oklch(57.7%_0.245_27.325)]',
  MAINTENANCE: 'border-[oklch(44.8%_0.119_151.328)] text-[oklch(44.8%_0.119_151.328)]',
  COMPLETED: 'border-[oklch(55.6%_0_0)] text-[oklch(55.6%_0_0)]',
};

export const ProjectStatusBadge = ({ status, className }: Props) => {
  return (
    <Badge
      variant={'outline'}
      className={twMerge('bg-sidebar-primary-foreground', badgeClassNames[status], className)}
    >
      {PROJECT_STATUS[status]}
    </Badge>
  );
};
