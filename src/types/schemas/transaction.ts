import { z } from 'zod';
import { BaseResponseSchema } from './base';

const BalanceDataSchema = z.object({
  balance: z.number(),
});

export const TransactionDataSchema = z.object({
  invoice_number: z.string(),
  service_code: z.string().optional(),
  service_name: z.string().optional(),
  description: z.string().optional(),
  transaction_type: z.enum(['PAYMENT', 'TOPUP']),
  total_amount: z.number(),
  created_on: z.string().datetime(),
});

export const TransactionSchemas = {
  balance: {
    response: BaseResponseSchema.extend({
      data: BalanceDataSchema.nullable(),
    }),
  },

  topup: {
    body: z.object({
      top_up_amount: z.number().min(10000).max(1000000),
    }),
    response: BaseResponseSchema.extend({
      data: BalanceDataSchema.nullable(),
    }),
  },

  transaction: {
    body: z.object({
      service_code: z.string(),
    }),
    response: BaseResponseSchema.extend({
      data: TransactionDataSchema.nullable(),
    }),
  },

  transactionHistory: {
    query: z.object({
      offset: z
        .string()
        .or(z.number())
        .transform(val => Number(val)),
      limit: z
        .string()
        .or(z.number())
        .optional()
        .transform(val => (val ? Number(val) : undefined)),
    }),
    response: BaseResponseSchema.extend({
      data: z
        .object({
          offset: z
            .string()
            .or(z.number())
            .transform(val => Number(val)),
          limit: z
            .string()
            .or(z.number())
            .transform(val => Number(val)),
          records: z.array(TransactionDataSchema),
        })
        .nullable(),
    }),
  },
};
