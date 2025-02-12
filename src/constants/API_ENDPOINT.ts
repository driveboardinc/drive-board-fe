const ROOT_API = '/api';

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
};

export { API_ENDPOINT };
