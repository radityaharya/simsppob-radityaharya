import { createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';
import { InformationSchemas } from '~/types/schemas/information';
import { getBanners, getServices } from '../actions/information';

type Banner = z.infer<typeof InformationSchemas.banners.response>['data'][0];
type Service = z.infer<typeof InformationSchemas.services.response>['data'][0];

interface InformationState {
  banners: Banner[];
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: InformationState = {
  banners: [],
  services: [],
  loading: false,
  error: null,
};

const informationSlice = createSlice({
  name: 'information',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBanners.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getServices.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default informationSlice.reducer;
