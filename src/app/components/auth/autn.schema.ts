import * as z from 'zod';

import { REQUIRED_MESSAGE } from '@/lib/constants.ts';

export const authSchema = z.object({
  email: z.string().email({ message: 'Невалидный email' }),
  password: z.string({ message: REQUIRED_MESSAGE }).min(3, { message: 'Минимум 3 символа' }),
});

export type AuthSchema = z.infer<typeof authSchema>;
