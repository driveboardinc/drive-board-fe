"use server";

import { z } from "zod";

// Define validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Validate form data
  const validatedFields = ContactFormSchema.safeParse({
    name,
    email,
    subject,
    message,
  });

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the contact request

    // For demonstration, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example database operation (commented out):
    // await db.contact.create({
    //   data: {
    //     name,
    //     email,
    //     subject,
    //     message,
    //   }
    // })

    return {
      success: true,
    };
  } catch {
    // Handle any errors that occur during submission
    return {
      errors: {
        _form: ["Failed to submit the contact form. Please try again later."],
      },
      success: false,
    };
  }
}
