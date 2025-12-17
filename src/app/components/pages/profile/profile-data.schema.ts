import * as z from 'zod';

export const profileDataSchema = z.object({
  name: z.string().optional(),
});

export type ProfileDataSchema = z.infer<typeof profileDataSchema>;
