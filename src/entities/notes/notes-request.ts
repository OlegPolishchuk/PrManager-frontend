import type { CreateNoteRequestFields } from '@/entities/notes/types.ts';
import { api } from '@/lib/api/instance.ts';

export const createNote = (data: CreateNoteRequestFields) => {
  return api.post(`/api/projects/${data.projectId}/notes`, data);
};
