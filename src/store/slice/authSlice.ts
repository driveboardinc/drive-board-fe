import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAuthCookies, clearAuthCookies } from '@/utils/auth';

interface User {
  id: string;
  email: string;
  username: string;
  is_driver: boolean;
  is_carrier: boolean;
  is_verified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoggingOut: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        access: string;
        refresh: string;
        user_id: string;
        username: string;
        email: string;
        is_driver: boolean;
        is_carrier: boolean;
        is_verified: boolean;
      }>
    ) => {
      const { access, refresh, user_id, ...userData } = action.payload;
      state.user = {
        id: user_id,
        ...userData,
      };
      state.isAuthenticated = true;
      // Set cookies for middleware
      setAuthCookies(access, refresh);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Clear cookies
      clearAuthCookies();
    },
    setLoggingOut: (state, action: PayloadAction<boolean>) => {
      state.isLoggingOut = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoggingOut } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoggingOut = (state: { auth: AuthState }) =>
  state.auth.isLoggingOut;

export default authSlice.reducer;
