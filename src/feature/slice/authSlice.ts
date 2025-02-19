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
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
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
      console.log('USER DATA', userData);
      state.user = {
        id: user_id,
        ...userData,
      };
      state.isAuthenticated = true;
      console.log('SETTING CREDENTIALS');
      // Set cookies for middleware
      setAuthCookies(access, refresh);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Clear cookies
      clearAuthCookies();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
