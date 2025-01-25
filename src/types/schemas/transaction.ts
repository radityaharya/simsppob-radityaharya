import { z } from 'zod';
import { BaseResponseSchema } from './base';

const BalanceDataSchema = z.object({
  balance: z.number(),
});

export const TransactionDataSchema = z.object({
  invoice_number: z.string(),
  service_code: z.string(),
  service_name: z.string(),
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
      offset: z.number().default(0),
      limit: z.number().optional(),
    }),
    response: BaseResponseSchema.extend({
      data: z
        .object({
          offset: z.number(),
          limit: z.number(),
          records: z.array(TransactionDataSchema),
        })
        .nullable(),
    }),
  },
};
