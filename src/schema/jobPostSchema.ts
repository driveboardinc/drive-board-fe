import { z } from 'zod';

export const jobTypeOptions = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Internship',
] as const;
export const shiftOptions = ['Day', 'Night', 'Rotating', 'Flexible'] as const;
export const experienceLevelOptions = [
  'Entry',
  'Mid',
  'Senior',
  'Lead',
  'Executive',
] as const;
export const applicationMethodOptions = [
  'Direct',
  'External URL',
  'Email',
] as const;

export const jobPostSchema = z.object({
  // Job Details
  job_title: z.string().min(3, 'Job title must be at least 3 characters'),
  company_for_this_job: z.string().min(2, 'Company name is required'),
  num_openings: z.number().min(1, 'Must have at least 1 opening'),
  country: z.string().min(2, 'Country is required'),
  language: z.string().min(2, 'Language is required'),
  location: z.string().min(2, 'Location is required'),
  job_type: z
    .array(z.enum(jobTypeOptions))
    .min(1, 'Select at least one job type'),
  shift: z.enum(shiftOptions),
  day_range: z.string().min(2, 'Working days range is required'),
  pay: z.string().min(1, 'Pay information is required'),
  experience_level: z.enum(experienceLevelOptions),
  benefits: z.array(z.string()),
  job_description: z
    .string()
    .min(50, 'Job description must be at least 50 characters'),
  customized_pre_screening: z.array(z.string()).optional(),
  qualifications: z.array(z.string()),

  // Settings
  application_method: z.enum(applicationMethodOptions),
  required_resume: z.boolean(),
  application_updates: z.boolean(),
  candidates_contact_you: z.boolean(),
  fair_chance_hiring: z.boolean(),
  background_check: z.boolean(),
});

export const tableJobPostSchema = z.object({
  id: z.number(),
  job_title: z.string(),
  company_for_this_job: z.string(),
  num_openings: z.number(),
  country: z.string(),
  language: z.string(),
  location: z.string(),
  job_type: z.enum(jobTypeOptions),
  shift: z.enum(shiftOptions),
  day_range: z.string(),
  pay: z.string(),
  experience_level: z.enum(experienceLevelOptions),
  benefits: z.array(z.string()),
  job_description: z.string(),
  customized_pre_screening: z.array(z.string()).optional(),
  qualifications: z.array(z.string()),
  application_method: z.enum(applicationMethodOptions),
  required_resume: z.boolean(),
  application_updates: z.boolean(),
  candidates_contact_you: z.boolean(),
  fair_chance_hiring: z.boolean(),
  background_check: z.boolean(),
});

export type TableJobPost = z.infer<typeof tableJobPostSchema>;

// If you need create/update schemas like in postSchema:
export const createJobPostSchema = jobPostSchema;
export const updateJobPostSchema = jobPostSchema;

export type JobPostFormData =
  | z.infer<typeof createJobPostSchema>
  | z.infer<typeof updateJobPostSchema>;
