import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../reducers/store';
import { setContents } from './data';
import { apiClient, API_ENDPOINTS } from '../../constants/api-constants';

export const fetchPosts = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'groupedActions/fetchPosts',
  async (_, { dispatch }) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.POSTS);
      dispatch(setContents(response.data));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
