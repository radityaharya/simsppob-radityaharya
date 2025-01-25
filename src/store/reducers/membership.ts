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
  persistedData: undefined,
  lastUpdated: undefined,
  isValidating: false,
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
      if (state.profile) {
        state.persistedData = {
          firstName: state.profile.first_name,
          lastName: state.profile.last_name,
          profileImage: state.profile.profile_image,
          lastUpdated: Date.now(),
          isValidating: false,
        };
      }
      state.isAuthenticated = false;
      state.token = null;
      state.profile = null;
      state.loading = false;
      state.error = null;
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
    clearPersistedData: state => {
      state.persistedData = undefined;
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
          ...(action.payload?.membership || {}),
          loading: false,
          error: null,
        };
      })
      .addCase(getProfile.pending, state => {
        state.loading = state.profile === null;
        state.isValidating = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isValidating = false;
        state.error = null;
        if (action.payload) {
          state.profile = action.payload;
          state.persistedData = {
            firstName: action.payload.first_name,
            lastName: action.payload.last_name,
            profileImage: action.payload.profile_image,
            lastUpdated: Date.now(),
            isValidating: false,
          };
          state.lastUpdated = Date.now();
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

export const {
  setAuth,
  clearAuth,
  setLoading,
  clearError,
  setProfile,
  clearProfile,
  clearPersistedData,
} = membershipSlice.actions;
export default membershipSlice.reducer;
