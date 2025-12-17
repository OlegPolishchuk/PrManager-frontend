import z from 'zod';

import { REQUIRED_MESSAGE } from '@/lib/constants.ts';

export const projectSchema = z.object({
  name: z.string().nonempty({ message: REQUIRED_MESSAGE }),
  description: z.string(),
  color: z.string().optional(),
  icon: z.string().optional(),
  projectStatus: z.string(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
