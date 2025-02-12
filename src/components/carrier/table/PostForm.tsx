import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import {
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
} from '@/app/api/jobPostApiSlice';
import { ErrorResponse } from '@/interface/IErrorType';
import { PostFormProps } from '@/interface/IDialogFormType';
import {
  createPostSchema,
  PostFormData,
  updatePostSchema,
} from '@/schema/postSchema';

export function PostForm({ setShowDialog, post }: PostFormProps) {
  const [createPost] = useCreateJobPostMutation();
  const [updatePost] = useUpdateJobPostMutation();

  const postSchema = post ? updatePostSchema : createPostSchema;

  const postForm = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      author: post?.author ?? '',
      author_image: '',
      title: post?.title ?? '',
      content: post?.content ?? '',
      slug: post?.slug ?? '',
      image: '',
      tags: post?.tags ?? '',
      status: post?.status ?? 'Draft',
    },
  });

  postForm.register('author_image');

  const { setError } = postForm;

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
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
                setError(field as keyof PostFormData, {
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
                setError(field as keyof PostFormData, {
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
    <Form {...postForm}>
      <form onSubmit={postForm.handleSubmit(onSubmit)} className="space-y-4">
        <Button
          className="w-full"
          type="submit"
          disabled={Object.keys(postForm?.formState.errors || {}).length > 0}
        >
          {post ? `Update Post Details` : `Create a Post`}
        </Button>
      </form>
    </Form>
  );
}
