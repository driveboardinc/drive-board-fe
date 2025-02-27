import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['JobPost'],
  endpoints: () => ({}),
});
