import type { ProjectSchema } from '@/app/components/pages/projects/project.schema.ts';
import type { Project } from '@/entities/projects/types.ts';
import { api } from '@/lib/api/instance.ts';
import type { ListResponse, PaginatedRequestFields } from '@/lib/api/types.ts';

export const getProjects = (paginatedParams: PaginatedRequestFields) => {
  return api.get<ListResponse<Project[]>>('/api/projects', {
    params: paginatedParams,
  });
};

export const createNewProject = (data: ProjectSchema) => {
  return api.post<Project>('/api/projects/create', data);
};
