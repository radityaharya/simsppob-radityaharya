import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import { loginUser } from '../actions/thunkActions';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.loading = false;
    },
    clearAuth: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Login failed';
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase('persist/REHYDRATE', (state, action: any) => {
        return {
          ...state,
          ...action.payload?.auth,
          loading: false,
          error: null,
        };
      });
  },
});

export const { setAuth, clearAuth, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;
