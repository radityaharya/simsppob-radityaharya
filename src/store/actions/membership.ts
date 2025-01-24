import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, API_ENDPOINTS } from '../../constants/api-constants';
import { z } from 'zod';
import { MembershipSchemas } from '~/types/schemas/membership';
import { RootState } from '../reducers/store';
import axios from 'axios';

export const loginUser = createAsyncThunk<
  string,
  z.infer<typeof MembershipSchemas.login.body>,
  { state: RootState; rejectValue: string }
>('membership/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, credentials);
    const validated = MembershipSchemas.login.response.parse(response.data);

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
  z.infer<typeof MembershipSchemas.registration.body>,
  { state: RootState; rejectValue: string }
>('membership/register', async (registrationData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.auth.register, registrationData);
    const validated = MembershipSchemas.registration.response.parse(response.data);

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

export const getProfile = createAsyncThunk<
  z.infer<typeof MembershipSchemas.profile.response>['data'],
  void,
  { state: RootState; rejectValue: string }
>('membership/getProfile', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().membership.token;
    if (!token) {
      return rejectWithValue('Authentication required');
    }

    const response = await apiClient.get(API_ENDPOINTS.auth.profile, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const validated = MembershipSchemas.profile.response.parse(response.data);

    if (validated.status !== 0 || !validated.data) {
      return rejectWithValue(validated.message || 'Failed to fetch profile');
    }

    return validated.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'Profile fetch failed');
    }
    if (error instanceof z.ZodError) {
      return rejectWithValue('Invalid profile data format');
    }
    return rejectWithValue('Failed to load profile');
  }
});

export const updateProfile = createAsyncThunk<
  z.infer<typeof MembershipSchemas.profile.response>['data'],
  z.infer<typeof MembershipSchemas.updateProfile.body>,
  { state: RootState; rejectValue: string }
>('membership/updateProfile', async (profileData, { rejectWithValue, getState }) => {
  try {
    const token = getState().membership.token;
    if (!token) {
      return rejectWithValue('Authentication required');
    }

    const response = await apiClient.put(API_ENDPOINTS.auth.profile, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const validated = MembershipSchemas.profile.response.parse(response.data);

    if (validated.status !== 0 || !validated.data) {
      return rejectWithValue(validated.message || 'Profile update failed');
    }

    return validated.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
    if (error instanceof z.ZodError) {
      return rejectWithValue('Invalid profile response format');
    }
    return rejectWithValue('Failed to update profile');
  }
});

export const updateProfileImage = createAsyncThunk<
  z.infer<typeof MembershipSchemas.updateProfileImage.response>['data'],
  File,
  { state: RootState; rejectValue: string }
>('membership/updateProfileImage', async (file, { rejectWithValue, getState }) => {
  try {
    const token = getState().membership.token;
    if (!token) {
      return rejectWithValue('Authentication required');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.put(API_ENDPOINTS.auth.profileImage, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const validated = MembershipSchemas.updateProfileImage.response.parse(response.data);

    if (validated.status !== 0 || !validated.data?.profile_image) {
      return rejectWithValue(validated.message || 'Image update failed');
    }

    return validated.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
    if (error instanceof z.ZodError) {
      return rejectWithValue('Invalid image response format');
    }
    return rejectWithValue('Failed to update profile image');
  }
});
