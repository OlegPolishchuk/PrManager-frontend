import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { FolderPlus } from 'lucide-react';

import { CreateButton } from '@/app/components/buttons/create-button.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import { getProjectsQueryOptions } from '@/entities/projects/hooks.ts';
import type { PaginatedRequestFields } from '@/lib/api/types.ts';

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

      {!totalCount && (
        <div className={'mt-20 flex h-full flex-col items-center justify-center gap-10'}>
          <Typography variant={'headline-4'}>У вас еще нет ни одного проекта</Typography>

          <CreateButton
            className={''}
            onClick={handleRedirectToCreateProjectPage}
            icon={<FolderPlus />}
          >
            Создать проект
          </CreateButton>
        </div>
      )}
    </div>
  );
}
