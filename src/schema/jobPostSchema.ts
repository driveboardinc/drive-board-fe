import { z } from "zod";

export const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"] as const;
export const shiftOptions = ["Day", "Night", "Rotating", "Flexible"] as const;
export const experienceLevelOptions = [
  "1 month",
  "2 months",
  "3 months",
  "6 months",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "5+ years",
] as const;
export const applicationMethodOptions = ["Direct", "External URL", "Email"] as const;
export const vehicleTypes = ["Box Truck", "Cargo/Cube Van", "Semi Truck"] as const;

export const jobPostSchema = z.object({
  // Job Details
  job_title: z.string().min(3, "Job title must be at least 3 characters"),
  company_for_this_job: z.string().min(2, "Company name is required"),
  num_openings: z.number().min(1, "Must have at least 1 opening"),
  country: z.string().min(2, "Country is required"),
  language: z.string().min(2, "Language is required"),
  location: z.string().min(2, "Location is required"),
  job_type: z.array(z.enum(jobTypeOptions)).min(1, "Select at least one job type"),
  shift: z.enum(shiftOptions),
  day_range: z.string().min(2, "Working days range is required"),
  pay: z.string().min(1, "Pay information is required"),
  experience_level: z.enum(experienceLevelOptions),
  benefits: z.array(z.string()),
  job_description: z.string().min(50, "Job description must be at least 50 characters"),
  customized_pre_screening: z.array(z.string()).optional(),
  qualifications: z.array(z.string()),
  vehicle_type: z.array(z.enum(vehicleTypes)),

  // Settings
  application_method: z.enum(applicationMethodOptions),
  required_resume: z.boolean(),
  application_updates: z.boolean(),
  candidates_contact_you: z.boolean(),
  fair_chance_hiring: z.boolean(),
  background_check: z.boolean(),
});

export const tableJobPostSchema = jobPostSchema.extend({
  id: z.number(),
});

export type TableJobPost = z.infer<typeof tableJobPostSchema>;
export type JobPostFormData = z.infer<typeof jobPostSchema>;

export type Job = z.infer<typeof tableJobPostSchema> & {
  carrier: {
    name: string;
    avatar: string;
  };
  status: string;
  posted_at: string;
  salary: number;
};
