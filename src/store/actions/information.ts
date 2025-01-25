import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, API_ENDPOINTS } from '../../constants/api-constants';
import { InformationSchemas } from '~/types/schemas/information';
import { RootState } from '../reducers/store';
import { handleApiRequest } from './helper';
import { z } from 'zod';

type Banner = z.infer<typeof InformationSchemas.banners.response>['data'][number];
type Service = z.infer<typeof InformationSchemas.services.response>['data'][number];

export const getBanners = createAsyncThunk<
  Banner[],
  undefined,
  {
    state: RootState;
    rejectValue: string;
  }
>('information/getBanners', async (_: undefined, { rejectWithValue }) => {
  const request = apiClient.get(API_ENDPOINTS.information.banner);
  return await handleApiRequest(request, InformationSchemas.banners.response, rejectWithValue);
});

export const getServices = createAsyncThunk<
  Service[],
  undefined,
  {
    state: RootState;
    rejectValue: string;
  }
>('information/getServices', async (_: undefined, { rejectWithValue }) => {
  const request = apiClient.get(API_ENDPOINTS.information.services);
  return await handleApiRequest(request, InformationSchemas.services.response, rejectWithValue);
});
