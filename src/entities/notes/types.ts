export interface Note {
  id: string;

  note?: string;
  type: NoteType;
  links: RecordLink[];
  projectId: string;
  createdAt: string;
  updatedAt: string;

  groupTitle: string;
  records: NoteGroup[];
}

export interface NoteGroup {
  title: string;
  value: string;
}

export type NoteType = 'NOTE' | 'CREDENTIALS' | 'ENVIRONMENT' | 'PAYMENT_TEST';

export const NOTE_TYPES = {
  NOTE: 'Заметка',
  CREDENTIALS: 'Доступы',
  ENVIRONMENT: 'Окружение',
  PAYMENT_TEST: 'Тестовые платежи',
};

export interface RecordLink {
  id: string;
  projectId: string;
  title: string;
  url: string;
}

export interface CreateNoteRequestFields {
  title?: string;
  value?: string;
  type: NoteType;
  links: Omit<RecordLink, 'id'>[];
  projectId: string;
}
