import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Profile } from '../../types/auth';
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  updateProfileImage,
} from '../actions/membership';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: true,
  error: null,
  profile: null,
};

const membershipSlice = createSlice({
  name: 'membership',
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
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    clearProfile: state => {
      state.profile = null;
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
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Registration failed';
      })
      .addCase('persist/REHYDRATE', (state, action: any) => {
        return {
          ...state,
          ...action.payload?.membership,
          loading: false,
          error: null,
        };
      })
      .addCase(getProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.profile = action.payload;
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.profile = action.payload;
        }
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.profile = action.payload;
        }
      });
  },
});

export const { setAuth, clearAuth, setLoading, clearError, setProfile, clearProfile } =
  membershipSlice.actions;
export default membershipSlice.reducer;
