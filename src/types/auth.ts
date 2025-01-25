export interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error?: string | null;
  profile: Profile | null;
}
