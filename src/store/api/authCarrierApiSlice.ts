import { API_ENDPOINT, ROOT_API } from '@/constants/API_ENDPOINT';
import { apiSlice } from './apiSlice';

const authPath = `${ROOT_API}`;

export const authCarrierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    carrierSignup: builder.mutation({
      query: (signupData) => ({
        url: `${authPath}${API_ENDPOINT.CARRIER.SIGNUP}`,
        method: 'POST',
        body: signupData,
      }),
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: `${authPath}${API_ENDPOINT.CARRIER.SIGNIN}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useCarrierSignupMutation, useSignInMutation } =
  authCarrierApiSlice;
