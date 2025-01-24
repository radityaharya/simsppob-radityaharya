import { z } from 'zod';

export const BaseResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.unknown().nullable(),
});
