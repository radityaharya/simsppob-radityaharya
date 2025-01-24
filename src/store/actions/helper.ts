import axios from 'axios';
import { z } from 'zod';

export const handleApiRequest = async <T extends z.ZodType>(
  request: Promise<{ data: z.infer<T>['data'] }>,
  schema: T,
  rejectWithValue: (value: string) => any
): Promise<z.infer<T>['data']> => {
  try {
    const response = await request;
    const validated = schema.parse(response.data);

    if (validated.status !== 0) {
      return rejectWithValue(validated.message);
    }

    return validated.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.status && responseData?.message) {
        return rejectWithValue(responseData.message);
      }
      return rejectWithValue(responseData?.message || 'An error occurred');
    }

    if (error instanceof z.ZodError) {
      return rejectWithValue('Invalid server response format');
    }

    return rejectWithValue('An unexpected error occurred');
  }
};
