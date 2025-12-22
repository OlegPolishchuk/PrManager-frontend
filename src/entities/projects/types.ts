export interface Project {
  id: string;
  name: string;
  description: string;
  color?: string | null;
  icon?: string | null;
  ownerId: string;
  projectStatus: ProjectStatus;
  links: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'ACTIVE_DEVELOPMENT' | 'MAINTENANCE' | 'COMPLETED';

export const PROJECT_STATUS = {
  ACTIVE_DEVELOPMENT: 'Активная разработка',
  MAINTENANCE: 'Поддержка',
  COMPLETED: 'Завершен',
};

export interface NewProjectCreateFields {
  name: string;
  description: string;
  color?: string | null;
  icon?: string | null;
  projectStatus: string;
}

export interface UpdateProject extends NewProjectCreateFields {
  id: string;
}
