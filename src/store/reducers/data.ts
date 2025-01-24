import { createReducer } from '@reduxjs/toolkit';
import { setContents } from '../actions/data';
import { fetchPosts } from '../actions/thunkActions';
import { DataState } from '../../types/post';

const initialState: DataState = {
  posts: [],
  loading: false,
};

const dataReducer = createReducer<DataState>(initialState, builder => {
  builder
    .addCase(fetchPosts.pending, state => {
      state.loading = true;
    })
    .addCase(setContents, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    })
    .addCase(fetchPosts.rejected, state => {
      state.loading = false;
      state.posts = [];
    });
});

export default dataReducer;
