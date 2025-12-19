import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router';
import { FolderCode, FolderPlus } from 'lucide-react';

import { CreateButton } from '@/app/components/buttons/create-button.tsx';
import { Button } from '@/app/components/ui/button.tsx';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/app/components/ui/empty.tsx';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/app/components/ui/item.tsx';
import { getProjectsQueryOptions } from '@/entities/projects/hooks.ts';
import type { PaginatedRequestFields } from '@/lib/api/types.ts';
import { hexToRgba } from '@/lib/utils.ts';

export const Route = createFileRoute('/_authenticated/projects/')({
  component: RouteComponent,
  validateSearch: (search) => search as PaginatedRequestFields,
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ context, deps: { page, limit } }) => {
    const paginatedParams: PaginatedRequestFields = { page, limit };

    return context.queryClient.ensureQueryData(getProjectsQueryOptions(paginatedParams));
  },
});

function RouteComponent() {
  const { page, limit } = useSearch({ from: '/_authenticated/projects/' });
  const paginatedParams: PaginatedRequestFields = { page, limit };
  const navigate = useNavigate();

  const projectsRequest = useSuspenseQuery(getProjectsQueryOptions(paginatedParams));
  const { totalCount, data: projects } = projectsRequest.data.data;

  console.log('projects', projects);

  const handleRedirectToCreateProjectPage = () => {
    navigate({ to: '/projects/create' });
  };

  return (
    <div className={'flex flex-col'}>
      <CreateButton
        className={'ml-auto'}
        onClick={handleRedirectToCreateProjectPage}
        icon={<FolderPlus />}
      >
        Создать проект
      </CreateButton>

      <div className={'mt-10 flex flex-col gap-6'}>
        {projects.map((project) => {
          return (
            <Item
              key={project.id}
              variant='outline'
              style={{ background: project.color ? hexToRgba(project.color) : 'transparent' }}
            >
              <ItemContent>
                <ItemTitle>{project.name}</ItemTitle>
                <ItemDescription>{project.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Link to={'/projects/$projectId'} params={{ projectId: project.id }}>
                  <Button variant='outline' size='sm'>
                    Подробнее
                  </Button>
                </Link>
              </ItemActions>
            </Item>
          );
        })}
      </div>

      {!totalCount && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>Пока нет проектов</EmptyTitle>
            <EmptyDescription>
              У вас пока нет ни одного проекта. Создайте свой первый проект, чтобы начать работу.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className='flex gap-2'>
              <Button onClick={handleRedirectToCreateProjectPage}>Создать проект</Button>
              <Button variant='outline'>Импортировать проект</Button>
            </div>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
