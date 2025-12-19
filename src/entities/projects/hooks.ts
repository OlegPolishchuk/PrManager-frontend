import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { createNewProject, getProject, getProjects } from '@/entities/projects/project-requests.ts';
import type { PaginatedRequestFields } from '@/lib/api/types.ts';
import { DEFAULT_STALE_TIME } from '@/lib/constants.ts';

export const getProjectsQueryOptions = (paginatedParams: PaginatedRequestFields) =>
  queryOptions({
    queryKey: ['projects', paginatedParams],
    queryFn: () => getProjects(paginatedParams),
    staleTime: DEFAULT_STALE_TIME,
  });

export const useGetProjects = (paginatedParams: PaginatedRequestFields) => {
  return useQuery(getProjectsQueryOptions(paginatedParams));
};

export const useCreateProject = () => {
  // const queryClient = new QueryClient();

  return useMutation({
    mutationFn: createNewProject,
    onSuccess: () => {
      // queryClient.invalidateQueries(getProjectsQueryOptions({}).queryKey);
    },
  });
};

export const getProjectQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });
};
