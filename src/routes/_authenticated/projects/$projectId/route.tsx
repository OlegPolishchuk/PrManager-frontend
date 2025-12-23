import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useSearch } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

import { ProjectDescriptionTab } from '@/app/components/pages/current-project/tabs/project-description-tab/project-description-tab.tsx';
import { ProjectLinksTab } from '@/app/components/pages/current-project/tabs/project-links-tab/project-links-tab.tsx';
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
type TabValue = (typeof TABS)[keyof typeof TABS];

export const Route = createFileRoute('/_authenticated/projects/$projectId')({
  component: ProjectPage,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(getProjectQueryOptions(params.projectId)),
  // Определяем search параметры
  validateSearch: (search: Record<string, unknown>): { tab?: TabValue } => ({
    tab: (search.tab as TabValue) ?? TABS.description,
  }),
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const { tab: activeTab } = useSearch({ from: '/_authenticated/projects/$projectId' });
  const navigate = Route.useNavigate();

  const projectRequest = useSuspenseQuery(getProjectQueryOptions(projectId));
  const project = projectRequest.data.data;

  const getTabTriggerStyles = (color?: string | null) => ({
    style: {
      ['--active-bg' as string]: hexToRgba(color ?? 'transparent'),
    },
    className: 'data-[state=active]:bg-[var(--active-bg)]!',
  });

  const handleTabChange = (value: TabValue) => {
    navigate({
      search: (prev) => ({ ...prev, tab: value }),
    });
  };

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

      <Tabs
        defaultValue={activeTab}
        className={twMerge('w-[400px]')}
        onValueChange={handleTabChange}
      >
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
        <TabsContent value={TABS.links}>
          <ProjectLinksTab project={project} />
        </TabsContent>
      </Tabs>
    </>
  );
}
