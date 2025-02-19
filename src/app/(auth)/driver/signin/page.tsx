'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { SigninVector } from '@/components/svg-vector/signin-vector';
import { Icons } from '@/components/icon';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useSignInMutation } from '@/store/api/authDriverApiSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';
import { useToast } from '@/hooks/useToast';
import { setCredentials } from '@/store/slice/authSlice';
import { Error } from '@/interface/IErrorType';

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'driver',
  });
  const [driverSignin] = useSignInMutation();
  const dispatch = useDispatch();
  const toast = useToast();
  const error = useSelector((state: RootState) => state.auth.error);
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/driver-dashboard');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUserTypeChange = (value: string) => {
    setFormData({ ...formData, userType: value });
    router.push(value === 'driver' ? '/driver/signin' : '/carrier/signin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await driverSignin({
        ...formData,
        is_carrier: false,
        is_driver: true,
      }).unwrap();

      if (response.access && response.refresh) {
        // Dispatch the credentials to Redux store
        dispatch(setCredentials(response));

        toast.success({
          title: 'Sign in successful',
          description: 'You have successfully signed in',
        });
        router.push('/driver-dashboard');
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
    <div className="w-full h-screen flex items-center overflow-hidden bg-white shadow-xl">
      <div className="w-1/2 h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
        <SigninVector className="w-full h-auto max-h-[80vh]" />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-start p-8">
        <div className="flex items-center gap-2 py-2">
          <Icons.truck className="w-10 h-10 text-custom-purple" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        </div>

        <Progress value={100} className="mb-6" />
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Label
                htmlFor="userType"
                className="text-lg font-medium text-gray-700"
              >
                I am a:
              </Label>
              <Select
                defaultValue="driver"
                onValueChange={handleUserTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="carrier">Carrier</SelectItem>
                </SelectContent>
              </Select>

              <Label
                htmlFor="email"
                className="text-lg font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                onChange={handleInputChange}
                value={formData.email}
                placeholder="johndoe@example.com"
                required
                className="w-full h-12 font-inter"
              />

              <Label
                htmlFor="password"
                className="text-lg font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                onChange={handleInputChange}
                value={formData.password}
                placeholder="Enter your password"
                required
                className="w-full h-12"
              />
            </motion.div>
          </AnimatePresence>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end pt-4">
            <Button type="submit">Sign In</Button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href={
                formData.userType === 'driver'
                  ? '/driver/signup'
                  : '/carrier/signup'
              }
              className="text-custom-purple font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
