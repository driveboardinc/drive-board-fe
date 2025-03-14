'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import AuthHeader from '@/components/auth/AuthHeader';
import { useState, FormEvent } from 'react';
import {
  carrierSigninSchema,
  CarrierSigninFormData,
} from '@/schema/carrierSchema';
import { Error } from '@/interface/IErrorType';
import ROUTE from '@/constants/ROUTE';
import { useSignInMutation } from '@/store/api/authCarrierApiSlice';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slice/authSlice';

export default function CarrierSignInPage() {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<CarrierSigninFormData>({
    email: '',
    password: '',
    userType: 'carrier',
  });
  const [errors, setErrors] = useState<Partial<CarrierSigninFormData>>({
    email: '',
    password: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // carrier sign in api
  const [carrierSignin] = useSignInMutation();

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Only validate if form was previously submitted
    if (isSubmitted) {
      const fieldSchema = carrierSigninSchema.shape[field];
      const result = fieldSchema.safeParse(value);

      setErrors((prev) => ({
        ...prev,
        [field]: !result.success ? result.error.errors[0].message : '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validate all fields
    const result = carrierSigninSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );

      setErrors(formattedErrors);
      return;
    }

    try {
      const response = await carrierSignin({
        ...formData,
        is_carrier: true,
        is_driver: false,
      }).unwrap();

      if (response.access && response.refresh) {
        // Dispatch the credentials to Redux store
        dispatch(setCredentials(response));

        toast.success({
          title: 'Sign in successful',
          description: 'You have successfully signed in',
        });
        router.push(`${ROUTE.CARRIER.PATH}${ROUTE.CARRIER.DASHBOARD}`);
      }
    } catch (error: unknown) {
      if ((error as Error).originalStatus === 403) {
        toast.error({
          title: 'Sign in failed',
          description: 'Invalid email or password. Please try again.',
        });
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div>
        <AuthHeader />
      </div>
      <div className="flex-1 flex justify-center items-center pb-16">
        <div className="w-full max-w-md space-y-6 p-6 bg-background">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-muted-foreground">
              Enter your email and password to access your account
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                  tabIndex={3}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={
                !!errors.email ||
                !!errors.password ||
                formData.email === '' ||
                formData.password === ''
              }
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
