import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/entities/notes/notes-request.ts';
import { getProjectQueryOptions } from '@/entities/projects/hooks.ts';

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: (res) => {
      const projectId = res.data.projectId;

      queryClient.invalidateQueries(getProjectQueryOptions(projectId));
    },
  });
};
