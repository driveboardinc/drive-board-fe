import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setAuthCookies, clearAuthCookies, getAccessToken, getRefreshToken } from "@/utils/auth";

// Make sure this matches your API URL exactly
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // Check for 401 Unauthorized response
  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          clearAuthCookies();
          return result;
        }

        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refresh: refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { access, refresh } = refreshResult.data as {
            access: string;
            refresh: string;
          };
          await setAuthCookies(access, refresh);
          // Retry the original query with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          await clearAuthCookies();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["JobPost"],
  endpoints: () => ({}),
});
