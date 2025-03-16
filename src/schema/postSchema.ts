import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const basePostSchema = z.object({
  author: z
    .string()
    .min(1, "Author is required")
    .regex(/^[a-zA-Z\s]+$/, "Author must not contain special characters"),
  author_image: z
    .any()
    .refine((file) => file?.length > 0, "Image is required.")
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    ),
  title: z.string().min(1, "Title is required").max(255, "Title must not exceed 255 characters"),
  content: z.string().min(1, "Content is required"),
  image: z
    .any()
    .refine((file) => file?.length > 0, "Featured image is required.")
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    ),
  tags: z.string().min(1, "Tags is required"),
  slug: z.string().min(1, "Slug is required").max(255, "Slug must not exceed 255 characters"),
  status: z.enum(["Draft", "Published", "Archived"], {
    required_error: "Status is required",
  }),
});

export const postSchema = basePostSchema;

export const createPostSchema = postSchema;

export const updatePostSchema = basePostSchema.extend({
  author_image: z
    .any()
    .optional() // Make the field optional
    .refine((file) => !file || file.length === 0 || file[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || file.length === 0 || ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    ),
  image: z
    .any()
    .optional() // Make the field optional
    .refine((file) => !file || file.length === 0 || file[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || file.length === 0 || ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    ),
});

export interface TablePost {
  id: number;
  title: string;
  no_of_openings: number;
  location: string;
  shift: string;
  job_type_names: string[];
  experience_level_names: string[];
  application_method_names: string[];
  language_names: string[];
  description: string;
  require_resume: boolean;
  application_updates: boolean;
  allow_contact: boolean;
  background_check_required: boolean;
  min_pay?: number | null;
  max_pay?: number | null;
}

export type PostFormData = z.infer<typeof createPostSchema> | z.infer<typeof updatePostSchema>;
