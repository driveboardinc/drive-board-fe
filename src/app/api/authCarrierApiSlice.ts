import { API_ENDPOINT } from '@/constants/API_ENDPOINT';
import { apiSlice } from './apiSlice';

const authPath = API_ENDPOINT.SIGNUP.PATH;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    carrierSignup: builder.mutation({
      query: (signupData) => ({
        url: `${authPath}`,
        method: 'POST',
        body: signupData,
      }),
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: `${authPath}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useCarrierSignupMutation, useSignInMutation } = authApiSlice;
