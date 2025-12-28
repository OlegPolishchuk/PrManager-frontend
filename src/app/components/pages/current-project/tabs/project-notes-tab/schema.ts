import { z } from 'zod';

import { REQUIRED_MESSAGE } from '@/lib/constants.ts';

export const noteLinkSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url({ message: 'Невалидный URL' }),
});

const baseNoteSchema = z.object({
  projectId: z.string().min(1),
  links: z.array(noteLinkSchema),
});

export const NoteGroupSchema = z.object({
  title: z.string().min(1, 'Введите название'),
  value: z.string().min(1, 'Введите значение'),
});

export const projectNoteSchema = z.discriminatedUnion('type', [
  // NOTE: note обязателен, title/value запрещены
  baseNoteSchema.extend({
    type: z.literal('NOTE'),
    note: z.string().min(1, 'Введите текст заметки'),
    records: z.array(NoteGroupSchema).max(0), // запрещаем элементы
  }),

  // НЕ NOTE: title/value обязательны, note запрещено
  baseNoteSchema.extend({
    type: z.enum(['CREDENTIALS', 'ENVIRONMENT', 'PAYMENT_TEST']),
    records: z.array(NoteGroupSchema),
    groupTitle: z
      .string({ message: REQUIRED_MESSAGE })
      .min(1, { message: 'Введите название подгруппы' }),
    note: z.undefined(),
  }),
]);

export type ProjectNoteSchema = z.infer<typeof projectNoteSchema>;
