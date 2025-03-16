import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import { useCreateJobPostMutation, useUpdateJobPostMutation } from "@/store/api/jobPostApiSlice";
import { JobPostFormProps as DialogJobPostFormProps } from "@/interface/IDialogFormType";
import {
  jobPostSchema,
  JobPostFormData,
  jobTypeOptions,
  shiftOptions,
  experienceLevelOptions,
  payTypeOptions,
  payRateOptions,
  benefitsOptions,
} from "@/schema/jobPostSchema";
import { RootState } from "@/store/store";

interface JobPostFormExtendedProps extends Omit<DialogJobPostFormProps, "setShowDialog"> {
  onSave?: (data: JobPostFormData) => void;
  isWizard?: boolean;
  setShowDialog?: Dispatch<SetStateAction<boolean>>;
}

export function JobPostForm({ setShowDialog, post, onSave, isWizard }: JobPostFormExtendedProps) {
  const [createPost] = useCreateJobPostMutation();
  const [updatePost] = useUpdateJobPostMutation();
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const form = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      job_title: post?.job_title ?? "",
      num_openings: post?.num_openings ?? 1,
      location: post?.location ?? "",
      job_type: post?.job_type ? [post.job_type] : ["Full-time"],
      shift: post?.shift ?? "Day",
      day_range: post?.day_range ?? "",
      vehicle_type: post?.vehicle_type ?? "Box Truck",
      pay: post?.pay ?? {
        type: "Range",
        minimum: 0,
        maximum: 0,
        rate: "per hour",
      },
      experience_level: post?.experience_level ?? "3 years",
      benefits: post?.benefits ?? [],
      job_description: post?.job_description ?? "",
      customized_pre_screening: post?.customized_pre_screening ?? [],
      qualifications: post?.qualifications ?? [],
      required_resume: post?.required_resume ?? true,
      application_updates: post?.application_updates ?? "",
      candidates_contact_you: post?.candidates_contact_you ?? true,
      background_check: post?.background_check ?? false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof jobPostSchema>) => {
    if (isWizard && onSave) {
      onSave(data);
      return;
    }

    // Add more detailed auth logging
    const authDetails = {
      isAuthenticated: auth.isAuthenticated,
      hasToken: !!auth.accessToken,
      tokenPreview: auth.accessToken ? `${auth.accessToken.substring(0, 20)}...` : "none",
      user: auth.user,
    };
    console.log("JobPostForm - Auth Details:", authDetails);

    try {
      if (!auth.accessToken) {
        throw new Error("No auth token available");
      }

      // Update the transformed data
      const transformedData = {
        ...data,
        title: data.job_title,
        description: data.job_description,
        experience_level: [data.experience_level],
        // These are now arrays by default from the schema
        application_method: data.application_method,
        language: data.language,
        application_updates: data.application_updates === "" ? false : true,
        // Remove fields that aren't expected by the API
        job_title: undefined,
        job_description: undefined,
      };

      if (!post) {
        try {
          const response = await createPost(transformedData).unwrap();
          console.log("JobPostForm - Success Response:", response);
          toast.success("Job post created successfully");
          setShowDialog?.(false);
        } catch (error: unknown) {
          const err = error as { data?: string | { detail?: string } };

          if (
            typeof err.data === "string" &&
            err.data.includes("CarrierProfile matching query does not exist")
          ) {
            toast.error("Please complete your carrier profile before posting a job");
            router.push("/carrier/profile/setup"); // Redirect to profile setup
            return;
          }
          throw error; // Re-throw if it's a different error
        }
      } else {
        await updatePost({
          id: post.id,
          updates: transformedData,
        }).unwrap();
        toast.success("Job post updated successfully");
        setShowDialog?.(false);
      }
    } catch (error: unknown) {
      const err = error as {
        status?: number;
        data?: { detail?: string; [key: string]: unknown };
        message?: string;
      };
      console.error("JobPostForm - Error Details:", {
        status: err?.status,
        data: err?.data,
        message: err?.message,
      });

      // More specific error message
      const errorMessage =
        err?.data?.detail ||
        (typeof err?.data === "string" ? err.data : "Something went wrong. Please try again.");
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 px-2">
          <h2 className="text-xl font-bold">Job Details</h2>

          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter job title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="num_openings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Openings</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    placeholder="Enter number of openings"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {jobTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(type)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          const newValues = checked
                            ? [...currentValues, type]
                            : currentValues.filter((value) => value !== type);
                          field.onChange(newValues);
                        }}
                      />
                      <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shift"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {shiftOptions.map((shift) => (
                      <SelectItem key={shift} value={shift}>
                        {shift}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="day_range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Working Days Range</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Monday-Friday" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicle_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter vehicle type" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pay.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {payTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("pay.type") === "Range" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pay.minimum"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            placeholder="Enter minimum amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pay.maximum"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            placeholder="Enter maximum amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              ["Starting Amount", "Maximum Amount", "Exact Amount"].includes(form.watch("pay.type")) && (
                <FormField
                  control={form.control}
                  name="pay.amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          placeholder={`Enter ${form.watch("pay.type").toLowerCase()}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}

            <FormField
              control={form.control}
              name="pay.rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pay Rate</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pay rate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {payRateOptions.map((rate) => (
                        <SelectItem key={rate} value={rate}>
                          {rate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="experience_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceLevelOptions.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Benefits */}
          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benefits</FormLabel>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {benefitsOptions.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(benefit)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          const newValues = checked
                            ? [...currentValues, benefit]
                            : currentValues.filter((value) => value !== benefit);
                          field.onChange(newValues);
                        }}
                      />
                      <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {benefit}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter detailed job description" className="h-32" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Benefits */}

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Settings</h2>
          <FormField
            control={form.control}
            name="application_updates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Updates Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Enter email for application updates" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="required_resume"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Require Resume</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="candidates_contact_you"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Allow Candidates to Contact You</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="background_check"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Background Check Required</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Add this debug section above the button */}
        <div className="space-y-2 text-sm text-red-500">
          <p>Form State:</p>
          <ul>
            {Object.keys(form.formState.errors).map((key) => (
              <li key={key}>
                {key}: {(form.formState.errors as Record<string, { message: string }>)[key]?.message}
              </li>
            ))}
          </ul>
        </div>

        <Button
          className="w-full"
          type="submit"
          onClick={() => {
            // Trigger validation on all fields to show errors
            form.trigger();
          }}
        >
          {post ? "Update Job Post" : "Create Job Post"}
        </Button>
      </form>
    </Form>
  );
}
