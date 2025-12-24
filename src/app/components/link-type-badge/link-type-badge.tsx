import type { ReactNode } from 'react';
import { BookOpenText, FlaskConical, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { FigmaIcon } from '@/app/components/ui/icons/figma-icon.tsx';
import { GitlabIcon } from '@/app/components/ui/icons/gitlab-icon.tsx';
import { SwaggerIcon } from '@/app/components/ui/icons/swagger-icon.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import { type ProjectLinkType } from '@/entities/project-link/types.ts';

interface Props {
  className?: string;
  linkType: ProjectLinkType;
}

const badgeClassNames: Record<ProjectLinkType, string> = {
  REPO: 'fill-[#FC6D26]',
  FIGMA: 'fill-[#F24E1E]',
  DEV: 'text-slate-700 dark:text-slate-200',
  PROD: 'text-emerald-600 dark:text-emerald-400',
  DOCS: 'text-sky-600 dark:text-sky-400',
  OTHER: 'text-muted-foreground',
  SWAGGER: 'text-[#19B6B5]',
};

const badgeIcons: Record<ProjectLinkType, ReactNode> = {
  REPO: <GitlabIcon />,
  FIGMA: <FigmaIcon />,
  DEV: <FlaskConical />,
  PROD: <ShieldCheck />,
  DOCS: <BookOpenText />,
  OTHER: <MoreHorizontal />,
  SWAGGER: <SwaggerIcon />,
};

export const LinkTypeBadge = ({ linkType, className }: Props) => {
  return (
    <Typography
      variant={'small'}
      className={twMerge(
        'inline-flex items-center gap-1 text-[12px] leading-none',
        badgeClassNames[linkType],
        className,
      )}
    >
      <span className='[&>svg]:size-4 [&>svg]:shrink-0'>{badgeIcons[linkType]}</span>
    </Typography>
  );
};
