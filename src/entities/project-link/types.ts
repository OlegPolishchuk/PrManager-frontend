export interface ProjectLink {
  id: string;
  title: string;
  url: string;
  type: ProjectLinkType;
  description?: string;

  projectId: string;

  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectLinkType = 'REPO' | 'FIGMA' | 'DEV' | 'PROD' | 'DOCS' | 'OTHER' | 'SWAGGER';

export const LINK_TYPES = {
  REPO: 'Репозиторий',
  SWAGGER: 'Swagger API',
  FIGMA: 'Фигма',
  DEV: 'Девелоп стенд',
  PROD: 'Продакшен стенд',
  DOCS: 'Документация',
  OTHER: 'Другое',
};

export interface CreateProjectLinkRequestFields {
  title: string;
  url: string;
  type: ProjectLinkType;
  description?: string;
}

export interface UpdateProjectLinkRequestFields extends CreateProjectLinkRequestFields {
  id: string;
}
