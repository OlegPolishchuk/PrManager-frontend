import type {
  CreateProjectLinkRequestFields,
  ProjectLink,
  UpdateProjectLinkRequestFields,
} from '@/entities/project-link/types.ts';
import { api } from '@/lib/api/instance.ts';

export const updateProjectLink = (data: UpdateProjectLinkRequestFields) => {
  return api.put<ProjectLink>(`/api/links/${data.id}`, data);
};

export const createProjectLink = (data: CreateProjectLinkRequestFields) => {
  return api.post('/api/links', data);
};

export const deleteProjectLink = (id: string) => {
  return api.delete<ProjectLink>(`/api/links/${id}`);
};
