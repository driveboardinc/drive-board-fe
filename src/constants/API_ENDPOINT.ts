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
  SIGNUP: {
    PATH: `${ROOT_API}/api/signup`,
  },
  SIGNIN: {
    PATH: `${ROOT_API}/api/signin`,
  },
};

export { API_ENDPOINT };
