import { apiSlice } from "./apiSlice";

export const authCarrierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    carrierSignup: builder.mutation({
      query: (credentials) => ({
        url: "/signup/",
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
          is_carrier: true,
          is_driver: false,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    carrierSignin: builder.mutation({
      query: (credentials) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCarrierSignupMutation, useCarrierSigninMutation } = authCarrierApiSlice;
