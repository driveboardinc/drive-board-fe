"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the form schema
const carrierProfileSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  company_mailing_address: z.string().min(1, "Address is required"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  dot_mc_number: z.string().min(1, "DOT/MC number is required"),
  representative_name: z.string().min(1, "Representative name is required"),
  representative_email: z.string().email("Invalid email address"),
  representative_phone: z.string().min(10, "Phone number must be at least 10 digits"),
  formation_state: z.string().min(1, "Formation state is required"),
  operating_areas: z.string().min(1, "Operating areas is required"),
  specific_states: z.string().optional(),
  best_time_to_call: z.string().optional(),
  hiring_preferences: z.string().default("all"),
});

type CarrierProfileFormData = z.infer<typeof carrierProfileSchema>;

export default function ProfileSetup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const form = useForm<CarrierProfileFormData>({
    resolver: zodResolver(carrierProfileSchema),
    defaultValues: {
      company_name: "",
      company_mailing_address: "",
      phone_number: "",
      dot_mc_number: "",
      representative_name: "",
      representative_email: "",
      representative_phone: "",
      formation_state: "",
      operating_areas: "",
      specific_states: "",
      best_time_to_call: "",
      hiring_preferences: "all",
    },
  });

  const onSubmit = async (data: CarrierProfileFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting with data:", {
        ...data,
        user: auth.user?.id,
        token: auth.accessToken?.substring(0, 20) + "...", // Log partial token for debugging
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrier/profile/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({
          ...data,
          user: auth.user?.id,
          best_time_to_call: data.best_time_to_call
            ? new Date(data.best_time_to_call).toISOString()
            : undefined,
        }),
      });

      const responseData = await response.json();
      console.log("API Response:", {
        status: response.status,
        data: responseData,
      });

      if (!response.ok) {
        throw new Error(responseData.detail || responseData.error || "Failed to create carrier profile");
      }

      toast.success("Carrier profile created successfully!");
      router.push("/carrier/job-posts/create");
    } catch (error) {
      console.error("Error creating carrier profile:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create carrier profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Carrier Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your company name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_mailing_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Mailing Address</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your company mailing address"
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="(555) 555-5555" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dot_mc_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DOT/MC Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter DOT/MC number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="representative_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter representative name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="representative_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="representative@company.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="representative_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="(555) 555-5555" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="formation_state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formation State</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter formation state" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="operating_areas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operating Areas</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter operating areas" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specific_states"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific States</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter specific states" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="best_time_to_call"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best Time to Call</FormLabel>
                    <FormControl>
                      <Input {...field} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hiring_preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hiring Preferences</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter hiring preferences" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating Profile..." : "Create Carrier Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
