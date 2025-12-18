import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { type ProjectSchema } from '@/app/components/pages/projects/project.schema.ts';
import { ProjectForm } from '@/app/components/pages/projects/project-form.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb.tsx';
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
    <div className={'flex flex-col gap-6'}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={'/projects'}>Проекты</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Новый проект</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProjectForm submitCallback={handleCreateNewProject} disabled={disabled} />
    </div>
  );
}
