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
  '1 month',
  '2 months',
  '3 months',
  '6 months',
  '1 year',
  '2 years',
  '3 years',
  '4 years',
  '5 years',
  '5+ years',
] as const;
export const vehicleTypes = [
  'Box Truck',
  'Cargo/Cube Van',
  'Semi Truck',
] as const;

export const qualificationOptions = [
  'Driving',
  'Moving',
  'Heavy Lifting',
] as const;

export const payRateOptions = [
  'per hour',
  'per day',
  'per week',
  'per month',
  'per year',
] as const;

export const payTypeOptions = [
  'Range',
  'Starting Amount',
  'Maximum Amount',
  'Exact Amount',
] as const;

export const benefitsOptions = [
  'Health Insurance',
  'Dental Insurance',
  'Vision Insurance',
  'Life Insurance',
  '401(k)',
  'Paid Time Off',
  'Sick Leave',
  'Remote Work',
  'Flexible Schedule',
  'Professional Development',
] as const;

export const jobPostSchema = z.object({
  // Job Details
  job_title: z.string().min(3, 'Job title must be at least 3 characters'),
  num_openings: z.number().min(1, 'Must have at least 1 opening'),
  location: z.string().min(2, 'Location is required'),
  job_type: z
    .array(z.enum(jobTypeOptions))
    .min(1, 'Select at least one job type'),
  shift: z.enum(shiftOptions),
  day_range: z.string().min(2, 'Working days range is required'),
  pay: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('Range'),
      minimum: z.number().min(0, 'Minimum amount must be positive'),
      maximum: z.number().min(0, 'Maximum amount must be positive'),
      // .refine(
      //   (val) => val > this.minimum,
      //   'Maximum must be greater than minimum'
      // ),
      rate: z.enum(payRateOptions),
    }),
    z.object({
      type: z.literal('Starting Amount'),
      amount: z.number().min(0, 'Starting amount must be positive'),
      rate: z.enum(payRateOptions),
    }),
    z.object({
      type: z.literal('Maximum Amount'),
      amount: z.number().min(0, 'Maximum amount must be positive'),
      rate: z.enum(payRateOptions),
    }),
    z.object({
      type: z.literal('Exact Amount'),
      amount: z.number().min(0, 'Amount must be positive'),
      rate: z.enum(payRateOptions),
    }),
  ]),
  experience_level: z.enum(experienceLevelOptions),
  benefits: z.array(z.enum(benefitsOptions)),
  job_description: z
    .string()
    .min(50, 'Job description must be at least 50 characters'),
  customized_pre_screening: z.array(z.string()).optional(),
  qualifications: z.array(z.enum(qualificationOptions)),
  vehicle_type: z.enum(vehicleTypes),

  // Settings
  required_resume: z.boolean(),
  application_updates: z.string().email('Please provide a valid email address'),
  candidates_contact_you: z.boolean(),
  background_check: z.boolean(),
});

export const tableJobPostSchema = jobPostSchema.extend({
  id: z.number(),
  job_title: z.string(),
  num_openings: z.number(),
  location: z.string(),
  job_type: z.enum(jobTypeOptions),
  shift: z.enum(shiftOptions),
  day_range: z.string(),
  pay: z.object({
    type: z.enum(payTypeOptions),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
    amount: z.number().optional(),
    rate: z.enum(payRateOptions),
  }),
  experience_level: z.enum(experienceLevelOptions),
  benefits: z.array(z.enum(benefitsOptions)),
  job_description: z.string(),
  customized_pre_screening: z.array(z.string()).optional(),
  qualifications: z.array(z.enum(qualificationOptions)),
  required_resume: z.boolean(),
  application_updates: z.string(),
  candidates_contact_you: z.boolean(),
  background_check: z.boolean(),
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
