export const ROOT_API = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINT = {
  JOB_POSTS: {
    PATH: `${ROOT_API}/job-posts`,
    CREATE: "/",
    READ: "/",
    UPDATE: "/:id",
    DELETE: "/:id",
    ID: "/:id",
    SLUG: "/slug/:slug",
  },
  CARRIER: {
    SIGNUP: `/carrier/profile/create/`,
    SIGNIN: `/login/`,
    REFRESH: `/refresh/`,
  },
  DRIVER: {
    SIGNUP: `/driver/profile/create/`,
    SIGNIN: `/login/`,
    REFRESH: `/refresh/`,
  },
} as const;
