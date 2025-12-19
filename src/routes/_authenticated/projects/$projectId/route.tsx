import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb.tsx';
import { Card, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card.tsx';
import { getProjectQueryOptions } from '@/entities/projects/hooks.ts';

export const Route = createFileRoute('/_authenticated/projects/$projectId')({
  component: ProjectPage,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(getProjectQueryOptions(params.projectId)),
});

function ProjectPage() {
  const { projectId } = Route.useParams();

  const projectRequest = useSuspenseQuery(getProjectQueryOptions(projectId));
  const project = projectRequest.data.data;

  return (
    <>
      <Breadcrumb className={'mb-6'}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={'/projects'}>Проекты</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className={'flex flex-col gap-6'}>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>

          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
