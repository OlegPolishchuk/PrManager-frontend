import { z } from 'zod';

export const noteLinkSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url({ message: 'Невалидный URL' }),
});

const baseNoteSchema = z.object({
  projectId: z.string().min(1),
  links: z.array(noteLinkSchema),
});

export const projectNoteSchema = z.discriminatedUnion('type', [
  // NOTE: note обязателен, title/value запрещены
  baseNoteSchema.extend({
    type: z.literal('NOTE'),
    note: z.string().min(1, 'Введите текст заметки'),
    title: z.string().optional(),
    value: z.string().optional(),
  }),

  // НЕ NOTE: title/value обязательны, note запрещено
  baseNoteSchema.extend({
    type: z.enum(['CREDENTIALS', 'ENVIRONMENT', 'PAYMENT_TEST']),
    title: z.string().min(1, 'Введите название'),
    value: z.string().min(1, 'Введите значение'),
    note: z.string().optional(),
  }),
]);

export type ProjectNoteSchema = z.infer<typeof projectNoteSchema>;
