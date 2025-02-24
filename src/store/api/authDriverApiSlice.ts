import { API_ENDPOINT, ROOT_API } from "@/constants/API_ENDPOINT";
import { apiSlice } from "./apiSlice";
import { useEffect, useState } from "react";

interface AuthResponse {
  access: string;
  refresh: string;
  user?: {
    email: string;
    id: string;
    is_driver: boolean;
    is_carrier: boolean;
  };
}

interface SignupResponse {
  email: string;
  id: string;
  message?: string;
}

interface ErrorResponse {
  status: number;
  data: {
    message?: string;
    detail?: string;
    errors?: Record<string, string[]>;
  };
}

interface SignupRequest {
  email: string;
  password: string;
  is_driver?: boolean;
  is_carrier?: boolean;
  [key: string]: unknown;
}

interface SignInRequest {
  email: string;
  password: string;
  is_driver?: boolean;
  is_carrier?: boolean;
}

const authPath = `${ROOT_API}`;

export const authDriverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    driverSignup: builder.mutation<SignupResponse, SignupRequest>({
      query: (signupData) => ({
        url: `${authPath}${API_ENDPOINT.DRIVER.SIGNUP}`,
        method: "POST",
        body: signupData,
        credentials: "include",
      }),
      transformResponse: (response: SignupResponse) => {
        return response;
      },
      transformErrorResponse: (response: ErrorResponse) => {
        return {
          status: response.status,
          message: response.data.message || response.data.detail || "An error occurred during signup",
          errors: response.data.errors || {},
        };
      },
      invalidatesTags: [{ type: "JobPost" }],
    }),

    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: `${authPath}${API_ENDPOINT.DRIVER.SIGNIN}`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (response: AuthResponse) => {
        if (!response.access || !response.refresh) {
          throw new Error("Invalid response format from server");
        }
        return response;
      },
      transformErrorResponse: (response: ErrorResponse) => {
        if (response.status === 401) {
          return {
            status: response.status,
            message: "Invalid email or password",
          };
        }
        if (response.status === 403) {
          return {
            status: response.status,
            message: "Account is locked or inactive",
          };
        }
        return {
          status: response.status,
          message: response.data.message || response.data.detail || "An error occurred during sign in",
          errors: response.data.errors || {},
        };
      },
      invalidatesTags: [{ type: "JobPost" }],
    }),

    refreshToken: builder.mutation<AuthResponse, { refresh: string }>({
      query: (refreshData) => ({
        url: `${authPath}${API_ENDPOINT.DRIVER.REFRESH}`,
        method: "POST",
        body: refreshData,
        credentials: "include",
      }),
      transformErrorResponse: (response: ErrorResponse) => ({
        status: response.status,
        message: "Failed to refresh token",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useDriverSignupMutation, useSignInMutation, useRefreshTokenMutation } = authDriverApiSlice;

// Export a type-safe hook for checking authentication status
export const useAuthStatus = () => {
  const [status, setStatus] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      setStatus({
        isAuthenticated: !!token,
        isLoading: false,
      });
    };

    checkAuth();
  }, []);

  return status;
};
