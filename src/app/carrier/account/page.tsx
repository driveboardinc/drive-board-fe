"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { withCarrierAuth } from "@/components/auth/hocs/withCarrierAuth";
import { RootState } from "@/store/store";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const carrierProfileSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  company_description: z.string().min(1, "Company description is required"),
  dot_number: z.string().min(1, "DOT number is required"),
  mc_number: z.string().optional(),
  contact_email: z.string().email("Invalid email"),
  contact_phone: z.string().min(10, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
});

type CarrierProfileData = z.infer<typeof carrierProfileSchema>;

function CarrierAccountPage() {
  const auth = useSelector((state: RootState) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CarrierProfileData>({
    resolver: zodResolver(carrierProfileSchema),
    defaultValues: {
      company_name: "",
      company_description: "",
      dot_number: "",
      mc_number: "",
      contact_email: auth.user?.email || "",
      contact_phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: CarrierProfileData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/carrier/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Carrier Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter company name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe your company" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dot_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DOT Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter DOT number" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mc_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MC Number (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter MC number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter contact email" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter contact phone" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter business address" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default withCarrierAuth(CarrierAccountPage);
