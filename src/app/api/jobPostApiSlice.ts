import { API_ENDPOINT } from '@/constants/API_ENDPOINT';
import { apiSlice } from './apiSlice';
import { buildQueryString } from '@/lib/table-builder-query';
import { QueryParams } from '@/interface/ITableType';
import { ApiGetJobPostResponse } from '@/interface/IJobPost';

const jobPostsPath = API_ENDPOINT.JOB_POSTS.PATH;

export const jobPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobPosts: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${jobPostsPath}${API_ENDPOINT.JOB_POSTS.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [{ type: 'JobPost', data }],
    }),

    getJobPostBySlug: builder.query<ApiGetJobPostResponse, string>({
      query: (slug: string) => {
        return `${jobPostsPath}${API_ENDPOINT.JOB_POSTS.SLUG.replace(
          ':slug',
          slug
        )}`;
      },
      providesTags: (_, __, slug) => [{ type: 'JobPost', slug }],
    }),

    createJobPost: builder.mutation({
      query: (newJobPost) => ({
        url: `${jobPostsPath}${API_ENDPOINT.JOB_POSTS.CREATE}`,
        method: 'POST',
        body: newJobPost,
      }),
      invalidatesTags: [{ type: 'JobPost' }],
    }),

    updateJobPost: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${jobPostsPath}${API_ENDPOINT.JOB_POSTS.UPDATE.replace(
          ':id',
          id
        )}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (_, __, { slug }) => [
        { type: 'JobPost', slug },
        { type: 'JobPost' },
      ],
    }),

    deleteJobPost: builder.mutation({
      query: ({ id }) => ({
        url: `${jobPostsPath}${API_ENDPOINT.JOB_POSTS.DELETE.replace(
          ':id',
          id
        )}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { slug }) => [
        { type: 'JobPost', slug },
        { type: 'JobPost' },
      ],
    }),
  }),
});

export const {
  useGetJobPostsQuery,
  useGetJobPostBySlugQuery,
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
  useDeleteJobPostMutation,
} = jobPostsApiSlice;
