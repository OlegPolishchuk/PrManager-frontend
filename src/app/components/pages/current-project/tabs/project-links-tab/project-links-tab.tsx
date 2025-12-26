import type { Project } from '@/entities/projects/types.ts';

import { ProjectLinks } from './project-links.tsx';

interface Props {
  project: Project;
  className?: string;
}

export const ProjectLinksTab = ({ project }: Props) => {
  return <ProjectLinks project={project} />;
};
