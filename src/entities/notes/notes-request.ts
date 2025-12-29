import type {
  CreateNoteRequestFields,
  Note,
  UpdateNoteRequestFields,
} from '@/entities/notes/types.ts';
import { api } from '@/lib/api/instance.ts';

export const createNote = (data: CreateNoteRequestFields) => {
  console.log('createNote');
  return api.post<Note>(`/api/projects/${data.projectId}/notes`, data);
};

export const updateNote = (requestData: UpdateNoteRequestFields) => {
  const { projectId, noteId, ...data } = requestData;

  return api.put<Note>(`/api/projects/${projectId}/notes/${noteId}`, data);
};

export const getNoteById = (projectId: string, noteId: string) => {
  return api.get<Note>(`/api/projects/${projectId}/notes/${noteId}`);
};
