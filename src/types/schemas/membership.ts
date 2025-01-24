import { z } from 'zod';
import { BaseResponseSchema } from './base';

const ProfileDataSchema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  profile_image: z.string().url(),
});

export const MembershipSchemas = {
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
      data: ProfileDataSchema.nullable(),
    }),
  },

  updateProfile: {
    body: z.object({
      first_name: z.string().min(1),
      last_name: z.string().min(1),
    }),
    response: BaseResponseSchema.extend({
      data: ProfileDataSchema.nullable(),
    }),
  },

  updateProfileImage: {
    body: z.object({
      file: z
        .instanceof(File)
        .refine(file => file.size <= 100000, 'File size must be less than 100KB'),
    }),
    response: BaseResponseSchema.extend({
      data: ProfileDataSchema.nullable(),
    }),
  },
};
