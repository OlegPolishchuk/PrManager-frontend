import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote, getNoteById, updateNote } from '@/entities/notes/notes-request.ts';
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

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: (res) => {
      const projectId = res.data.projectId;
      const noteId = res.data.id;

      queryClient.invalidateQueries(getProjectQueryOptions(projectId));
      queryClient.invalidateQueries(getProjectNoteQueryOptions(projectId, noteId));
    },
  });
};

export const getProjectNoteQueryOptions = (projectId: string, noteId: string) => {
  return queryOptions({
    queryKey: ['projectNote', projectId, noteId],
    queryFn: () => getNoteById(projectId, noteId),
  });
};

export const useGetNote = () => {};
