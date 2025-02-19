import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

import {
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
} from '@/store/api/jobPostApiSlice';
import { ErrorResponse } from '@/interface/IErrorType';
import { JobPostFormProps } from '@/interface/IDialogFormType';
import {
  jobPostSchema,
  JobPostFormData,
  jobTypeOptions,
  shiftOptions,
  experienceLevelOptions,
  payTypeOptions,
  payRateOptions,
  benefitsOptions,
} from '@/schema/jobPostSchema';

export function JobPostForm({ setShowDialog, post }: JobPostFormProps) {
  const [createPost] = useCreateJobPostMutation();
  const [updatePost] = useUpdateJobPostMutation();

  const form = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      job_title: post?.job_title ?? '',
      num_openings: post?.num_openings ?? 1,
      location: post?.location ?? '',
      job_type: post?.job_type ? [post.job_type] : ['Full-time'],
      shift: post?.shift ?? 'Day',
      day_range: post?.day_range ?? '',
      pay: post?.pay ?? {
        type: 'Range',
        minimum: 0,
        maximum: 0,
        rate: 'per hour',
      },
      experience_level: post?.experience_level ?? 'Entry',
      benefits: post?.benefits ?? [],
      job_description: post?.job_description ?? '',
      customized_pre_screening: post?.customized_pre_screening ?? [],
      qualifications: post?.qualifications ?? [],
      required_resume: post?.required_resume ?? true,
      application_updates: post?.application_updates ?? '',
      candidates_contact_you: post?.candidates_contact_you ?? true,
      background_check: post?.background_check ?? false,
    },
  });

  const { setError } = form;

  const onSubmit = async (data: z.infer<typeof jobPostSchema>) => {
    const payload = {
      ...data,
    };

    try {
      if (!post) {
        const result = await createPost(payload).unwrap();
        if (result.success) {
          toast(result.message);

          setShowDialog(false);
        } else {
          Object.entries(result.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message) =>
                setError(field as keyof JobPostFormData, {
                  type: 'manual',
                  message,
                })
              );
            }
          });
        }
      } else {
        const result = await updatePost({
          id: post.id,
          updates: payload,
        }).unwrap();
        if (result.success) {
          toast(result.message);
          setShowDialog(false);
        } else {
          Object.entries(result.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message) =>
                setError(field as keyof JobPostFormData, {
                  type: 'manual',
                  message,
                })
              );
            }
          });
          toast(result.message);
        }
      }
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        toast(axiosError?.data?.message || 'No server error response');
      } else {
        toast('Something went wrong');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pay.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

            {form.watch('pay.type') === 'Range' ? (
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
              ['Starting Amount', 'Maximum Amount', 'Exact Amount'].includes(
                form.watch('pay.type')
              ) && (
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder={`Enter ${form
                            .watch('pay.type')
                            .toLowerCase()}`}
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                            : currentValues.filter(
                                (value) => value !== benefit
                              );
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
                  <Textarea
                    {...field}
                    placeholder="Enter detailed job description"
                    className="h-32"
                  />
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
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter email for application updates"
                  />
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
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={!form.formState.isValid}
        >
          {post ? 'Update Job Post' : 'Create Job Post'}
        </Button>
      </form>
    </Form>
  );
}
