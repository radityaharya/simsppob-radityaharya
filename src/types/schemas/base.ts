import { z } from 'zod';

// 0	Success	200	- Registration/login success
// - Profile update success
// - Transaction success
// 102	Parameter validation error	400	- Invalid email format
// - Invalid amount format
// - Missing required fields
// 103	Authentication failure	401	- Invalid username/password
// - Incorrect credentials
// 108	Token validation failure	401	- Expired JWT token
// - Invalid/missing authentication token

export const BaseResponseSchema = z.object({
  // TODO: define status code as enum?
  status: z.number(),
  message: z.string(),
  data: z.unknown().nullable(),
});
