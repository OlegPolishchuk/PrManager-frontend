import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProjectLink, updateProjectLink } from '@/entities/project-link/project-requests.ts';
import { getProjectQueryOptions } from '@/entities/projects/hooks.ts';

export const useUpdateProjectLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectLink,
    onSuccess: (res) => {
      const projectId = res.data.projectId;

      queryClient.invalidateQueries(getProjectQueryOptions(projectId));
    },
  });
};

export const useCreateProjectLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectLink,
    onSuccess: (res) => {
      const projectId = res.data.projectId;

      queryClient.invalidateQueries(getProjectQueryOptions(projectId));
    },
  });
};
