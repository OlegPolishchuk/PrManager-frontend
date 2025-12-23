import { useState } from 'react';

import type { Project } from '@/entities/projects/types.ts';

import { ProjectLinks } from './project-links.tsx';

interface Props {
  project: Project;
  className?: string;
}

export const ProjectLinksTab = ({ project }: Props) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <ProjectLinks project={project} editClickCallback={() => setEditMode(false)} />
      ) : (
        <ProjectLinks project={project} editClickCallback={() => setEditMode(true)} />
      )}
    </>
  );
};
