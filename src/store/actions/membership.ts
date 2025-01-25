import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, API_ENDPOINTS } from '../../constants/api-constants';
import { z } from 'zod';
import { MembershipSchemas } from '~/types/schemas/membership';
import { RootState } from '../reducers/store';
import axios from 'axios';
import { handleApiRequest } from './helper';

export const loginUser = createAsyncThunk<
  string,
  z.infer<typeof MembershipSchemas.login.body>,
  { state: RootState; rejectValue: string }
>('membership/login', async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.membership.login, credentials);
    const validated = MembershipSchemas.login.response.parse(response.data);

    if (validated.status !== 0) {
      return rejectWithValue(validated.message);
    }

    if (!validated.data) {
      return rejectWithValue('No data received');
    }

    if (!validated.data.token) {
      return rejectWithValue('No token received');
    }

    await dispatch(getProfile());

    return validated.data.token;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.status && responseData?.message) {
        return rejectWithValue(responseData.message);
      }
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

export const registerUser = createAsyncThunk<
  void,
  z.infer<typeof MembershipSchemas.registration.body>,
  { state: RootState; rejectValue: string }
>('membership/register', async (registrationData, { rejectWithValue }) => {
  const request = apiClient.post(API_ENDPOINTS.membership.register, registrationData);
  await handleApiRequest(request, MembershipSchemas.registration.response, rejectWithValue);
});

export const getProfile = createAsyncThunk<
  z.infer<typeof MembershipSchemas.profile.response>['data'],
  void,
  { state: RootState; rejectValue: string }
>('membership/getProfile', async (_, { rejectWithValue, getState }) => {
  const token = getState().membership.token;
  if (!token) {
    return rejectWithValue('Authentication required');
  }
  const request = apiClient.get(API_ENDPOINTS.membership.profile, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await handleApiRequest(request, MembershipSchemas.profile.response, rejectWithValue);
});

export const updateProfile = createAsyncThunk<
  z.infer<typeof MembershipSchemas.profile.response>['data'],
  z.infer<typeof MembershipSchemas.updateProfile.body>,
  { state: RootState; rejectValue: string }
>('membership/updateProfile', async (profileData, { rejectWithValue, getState }) => {
  const token = getState().membership.token;
  if (!token) {
    return rejectWithValue('Authentication required');
  }
  const request = apiClient.put(API_ENDPOINTS.membership.profile, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await handleApiRequest(request, MembershipSchemas.profile.response, rejectWithValue);
});

export const updateProfileImage = createAsyncThunk<
  z.infer<typeof MembershipSchemas.updateProfileImage.response>['data'],
  File,
  { state: RootState; rejectValue: string }
>('membership/updateProfileImage', async (file, { rejectWithValue, getState }) => {
  const token = getState().membership.token;
  if (!token) {
    return rejectWithValue('Authentication required');
  }
  const formData = new FormData();
  formData.append('file', file);
  const request = apiClient.put(API_ENDPOINTS.membership.profileImage, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return await handleApiRequest(
    request,
    MembershipSchemas.updateProfileImage.response,
    rejectWithValue
  );
});
