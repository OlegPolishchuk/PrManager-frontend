import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { type ProjectSchema } from '@/app/components/pages/projects/project.schema.ts';
import { ProjectForm } from '@/app/components/pages/projects/project-form.tsx';
import { useCreateProject } from '@/entities/projects/hooks.ts';

export const Route = createFileRoute('/_authenticated/projects/create')({
  component: CreateNewProjectPage,
});

function CreateNewProjectPage() {
  const navigate = useNavigate();
  const createProjectMutation = useCreateProject();
  const disabled = createProjectMutation.isPending;

  const handleCreateNewProject = (data: ProjectSchema) => {
    createProjectMutation.mutate(data, {
      onSuccess: () => {
        navigate({ to: '/projects', search: { page: 1 } });
      },
    });
  };

  return (
    <div>
      <ProjectForm submitCallback={handleCreateNewProject} disabled={disabled} />
    </div>
  );
}
