import { z } from "zod";

export interface CarrierSigninFormData {
  email: string;
  password: string;
  userType: string;
}

export const carrierSigninSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  userType: z.string(),
});

// Infer the type from the schema
