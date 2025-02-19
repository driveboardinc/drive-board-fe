const ROOT_API = process.env.NEXT_PUBLIC_API_URL;

const API_ENDPOINT = {
  JOB_POSTS: {
    PATH: `${ROOT_API}/job-posts`,
    CREATE: '/',
    READ: '/',
    UPDATE: '/:id',
    DELETE: '/:id',

    ID: '/:id',
    SLUG: '/slug/:slug',
  },
  CARRIER_SIGNUP: {
    PATH: `/carrier/profile/create/`,
  },
  SIGNIN: {
    PATH: `/login/`,
  },
};

export { API_ENDPOINT, ROOT_API };
