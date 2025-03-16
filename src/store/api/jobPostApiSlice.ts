import { API_ENDPOINT } from "@/constants/API_ENDPOINT";
import { apiSlice } from "./apiSlice";
import { QueryParams } from "@/interface/ITableType";
import { ApiGetJobPostResponse } from "@/interface/IJobPost";
import { TablePost } from "@/schema/postSchema";

// Add these interfaces
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

export interface JobPostCreateData {
  title: string;
  description: string;
  experience_level: string[];
  application_method: string[];
  language: string[];
  application_updates: boolean;
  num_openings: number;
  location: string;
  job_type: string[];
  shift: string;
  day_range: string;
  pay: {
    type: string;
    minimum?: number;
    maximum?: number;
    amount?: number;
    rate: string;
  };
  benefits: string[];
  vehicle_type: string;
  required_resume: boolean;
  candidates_contact_you: boolean;
  background_check: boolean;
}

interface JobPostResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TablePost[];
}

interface TransformedJobPostResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TablePost[];
  data: {
    items: TablePost[];
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
    pageCount: number;
    totalRecords: number;
  };
}

interface DeleteJobPostResponse {
  success: boolean;
  message: string;
}

interface DeleteJobPostRequest {
  id: number;
}

const jobPostsPath = API_ENDPOINT.JOB_POSTS.PATH;

export const jobPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobPosts: builder.query<TransformedJobPostResponse, QueryParams>({
      query: (data: QueryParams) => ({
        url: "/jobs/",
        method: "GET",
        params: {
          page: data.page || 1,
          pageSize: data.pageSize || 10,
        },
      }),
      transformResponse: (response: JobPostResponse) => {
        return {
          ...response,
          data: {
            items: response.results,
            pagination: {
              pageIndex: response.next ? parseInt(response.next.split("page=")[1]) - 1 : 1,
              pageSize: 10,
            },
            pageCount: Math.ceil(response.count / 10),
            totalRecords: response.count,
          },
        };
      },
      providesTags: ["JobPost"],
    }),

    getJobPostBySlug: builder.query<ApiGetJobPostResponse, string>({
      query: (slug: string) => {
        return `${jobPostsPath}${API_ENDPOINT.JOB_POSTS.SLUG.replace(":slug", slug)}`;
      },
      providesTags: (_, __, slug) => [{ type: "JobPost", slug }],
    }),

    createJobPost: builder.mutation<ApiResponse, JobPostCreateData>({
      query: (data) => ({
        url: "/jobs/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["JobPost"],
    }),

    updateJobPost: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${jobPostsPath}${API_ENDPOINT.JOB_POSTS.UPDATE.replace(":id", id)}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (_, __, { slug }) => [{ type: "JobPost", slug }, { type: "JobPost" }],
    }),

    deleteJobPost: builder.mutation<DeleteJobPostResponse, DeleteJobPostRequest>({
      query: ({ id }) => ({
        url: `/jobs/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["JobPost"],
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
