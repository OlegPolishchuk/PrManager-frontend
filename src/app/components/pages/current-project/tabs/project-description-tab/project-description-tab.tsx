import { useState } from 'react';

import { ProjectDescription } from '@/app/components/pages/current-project/tabs/project-description-tab/project-description.tsx';
import { ProjectDescriptionForm } from '@/app/components/pages/current-project/tabs/project-description-tab/project-description-form.tsx';
import type { Project } from '@/entities/projects/types.ts';

interface Props {
  project: Project;
  className?: string;
}

export const ProjectDescriptionTab = ({ project }: Props) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <ProjectDescriptionForm project={project} canselCallback={() => setEditMode(false)} />
      ) : (
        <ProjectDescription project={project} clickCallback={() => setEditMode(true)} />
      )}
    </>
  );
};
