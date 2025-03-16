import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthCookies, clearAuthCookies } from "@/utils/auth";

interface User {
  id: number;
  email: string;
  username?: string;
  is_carrier: boolean;
  is_driver: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoggingOut: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  error: null,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh, user } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.user = user;
      state.isAuthenticated = true;
      setAuthCookies(access, refresh, user.is_driver ? "driver" : "carrier");
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      clearAuthCookies();
    },
    setLoggingOut: (state, action: PayloadAction<boolean>) => {
      state.isLoggingOut = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoggingOut } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.accessToken !== null;
export const selectIsLoggingOut = (state: { auth: AuthState }) => state.auth.isLoggingOut;

export default authSlice.reducer;
