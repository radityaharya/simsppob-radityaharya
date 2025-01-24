import { z } from 'zod';
import { BaseResponseSchema } from './base';

export const AuthSchemas = {
  registration: {
    body: z.object({
      email: z.string().email(),
      first_name: z.string().min(1),
      last_name: z.string().min(1),
      password: z.string().min(8),
    }),
    response: BaseResponseSchema,
  },

  login: {
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    response: BaseResponseSchema.extend({
      data: z
        .object({
          token: z.string(),
        })
        .nullable(),
    }),
  },

  profile: {
    response: BaseResponseSchema.extend({
      data: z
        .object({
          email: z.string(),
          first_name: z.string(),
          last_name: z.string(),
          profile_image: z.string().url(),
        })
        .nullable(),
    }),
  },

  updateProfile: {
    body: z.object({
      first_name: z.string().min(1),
      last_name: z.string().min(1),
    }),
    response: BaseResponseSchema,
  },

  updateProfileImage: {
    body: z.object({
      file: z
        .instanceof(File)
        .refine(file => file.size <= 100000, 'File size must be less than 100KB'),
    }),
    response: BaseResponseSchema,
  },
};
