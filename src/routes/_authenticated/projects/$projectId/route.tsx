import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

import { ProjectDescriptionTab } from '@/app/components/pages/current-project/tabs/project-description-tab/project-description-tab.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/components/ui/breadcrumb.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs.tsx';
import { getProjectQueryOptions } from '@/entities/projects/hooks.ts';
import { hexToRgba } from '@/lib/utils.ts';

const TABS = {
  description: 'description',
  links: 'links',
};

export const Route = createFileRoute('/_authenticated/projects/$projectId')({
  component: ProjectPage,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(getProjectQueryOptions(params.projectId)),
});

function ProjectPage() {
  const { projectId } = Route.useParams();

  const projectRequest = useSuspenseQuery(getProjectQueryOptions(projectId));
  const project = projectRequest.data.data;

  const getTabTriggerStyles = (color?: string | null) => ({
    style: {
      ['--active-bg' as string]: hexToRgba(color ?? 'transparent'),
    },
    className: 'data-[state=active]:bg-[var(--active-bg)]!',
  });

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

      <Tabs defaultValue={TABS.description} className={twMerge('w-[400px]')}>
        <TabsList className={'mb-6'}>
          <TabsTrigger {...getTabTriggerStyles(project.color)} value={TABS.description}>
            Общее описание
          </TabsTrigger>
          <TabsTrigger {...getTabTriggerStyles(project.color)} value={TABS.links}>
            Ссылки проекта
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.description}>
          <ProjectDescriptionTab project={project} />
        </TabsContent>
        <TabsContent value={TABS.links}>Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
