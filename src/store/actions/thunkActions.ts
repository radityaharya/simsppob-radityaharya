import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, API_ENDPOINTS } from '../../constants/api-constants';
import { z } from 'zod';
import { AuthSchemas } from '~/types/schemas/membership';
import { RootState } from '../reducers/store';
import axios from 'axios';

export const loginUser = createAsyncThunk<
  string,
  z.infer<typeof AuthSchemas.login.body>,
  { state: RootState; rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, credentials);
    const validated = AuthSchemas.login.response.parse(response.data);

    if (validated.status !== 0) {
      return rejectWithValue(validated.message);
    }

    if (!validated.data?.token) {
      return rejectWithValue('No token received');
    }

    return validated.data.token;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        return rejectWithValue(responseData.message);
      }
    }

    if (error instanceof z.ZodError) {
      return rejectWithValue('Invalid server response format');
    }

    return rejectWithValue('An unexpected error occurred');
  }
});

export const registerUser = createAsyncThunk<
  void,
  z.infer<typeof AuthSchemas.registration.body>,
  { state: RootState; rejectValue: string }
>('auth/register', async (registrationData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.register, registrationData);
    const validated = AuthSchemas.registration.response.parse(response.data);

    if (validated.status !== 0) {
      return rejectWithValue(validated.message);
    }

    return;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        return rejectWithValue(responseData.message);
      }
      return rejectWithValue('Registration failed - no server response');
    }

    if (error instanceof z.ZodError) {
      return rejectWithValue('Invalid server response format');
    }

    return rejectWithValue('An unexpected error occurred during registration');
  }
});
