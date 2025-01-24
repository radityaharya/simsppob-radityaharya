import { z } from 'zod';
import { BaseResponseSchema } from './base';
export const InformationSchemas = {
  banners: {
    response: BaseResponseSchema.extend({
      data: z.array(
        z.object({
          banner_name: z.string(),
          banner_image: z.string().url(),
          description: z.string(),
        })
      ),
    }),
  },

  services: {
    response: BaseResponseSchema.extend({
      data: z.array(
        z.object({
          service_code: z.string(),
          service_name: z.string(),
          service_icon: z.string().url(),
          service_tariff: z.number(),
        })
      ),
    }),
  },
};
