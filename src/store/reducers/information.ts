import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';
import { InformationSchemas } from '~/types/schemas/information';
import { getBanners, getServices } from '../actions/information';
import { REHYDRATE } from 'redux-persist';

type Banner = z.infer<typeof InformationSchemas.banners.response>['data'][0];
type Service = z.infer<typeof InformationSchemas.services.response>['data'][0];

export interface InformationState {
  banners: Banner[];
  services: Service[];
  loading: boolean;
  isValidating: boolean;
  error: string | null;
  lastUpdated?: number;
}

const initialState: InformationState = {
  banners: [],
  services: [],
  loading: false,
  isValidating: false,
  error: null,
  lastUpdated: undefined,
};

const informationSlice = createSlice({
  name: 'information',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(REHYDRATE, (state, action: any) => {
        return {
          ...state,
          ...(action.payload?.information || {}),
          loading: false,
          isValidating: false,
        };
      })
      .addCase(getBanners.pending, state => {
        state.loading = state.banners.length === 0;
        state.isValidating = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.isValidating = false;
        state.banners = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.isValidating = false;
        state.error = action.payload as string;
      })
      .addCase(getServices.pending, state => {
        state.loading = state.services.length === 0;
        state.isValidating = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.isValidating = false;
        state.services = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.isValidating = false;
        state.error = action.payload as string;
      });
  },
});

export default informationSlice.reducer;
