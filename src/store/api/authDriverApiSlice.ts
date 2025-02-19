import { API_ENDPOINT, ROOT_API } from '@/constants/API_ENDPOINT';
import { apiSlice } from './apiSlice';

const authPath = `${ROOT_API}`;

export const authDriverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    driverSignup: builder.mutation({
      query: (signupData) => ({
        url: `${authPath}${API_ENDPOINT.DRIVER.SIGNUP}`,
        method: 'POST',
        body: signupData,
      }),
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: `${authPath}${API_ENDPOINT.DRIVER.SIGNIN}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useDriverSignupMutation, useSignInMutation } =
  authDriverApiSlice;
