"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AuthHeader from "@/components/auth/AuthHeader";
import { useState, FormEvent } from "react";
import { carrierSigninSchema, CarrierSigninFormData } from "@/schema/carrierSchema";
import { redirect, useRouter } from "next/navigation";
import { Error } from "@/interface/IErrorType";
import ROUTE from "@/constants/ROUTE";
import { useSignInMutation } from "@/app/api/authCarrierApiSlice";
import { useToast } from "@/hooks/useToast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CarrierSignInPage() {
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState<CarrierSigninFormData>({
    email: "",
    password: "",
    userType: "carrier",
  });
  const [errors, setErrors] = useState<Partial<CarrierSigninFormData>>({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // carrier sign in api
  const [carrierSignin] = useSignInMutation();

  const handleInputChange = (field: "email" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Only validate if form was previously submitted
    if (isSubmitted) {
      const fieldSchema = carrierSigninSchema.shape[field];
      const result = fieldSchema.safeParse(value);

      setErrors((prev) => ({
        ...prev,
        [field]: !result.success ? result.error.errors[0].message : "",
      }));
    }
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }));
    router.push(value === "driver" ? "/driver/signin" : "/carrier/signin");
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
      // Replace this with your actual signin API call
      const response = await carrierSignin(formData).unwrap();
      if (response.email) {
        toast.success({
          title: "Sign in successful",
          description: "You have successfully signed in",
        });
        redirect(`${ROUTE.CARRIER.PATH}${ROUTE.CARRIER.DASHBOARD}`);
      }
    } catch (error: unknown) {
      if ((error as Error).originalStatus === 403) {
        toast.error({
          title: "Sign in failed",
          description: "Invalid email or password. Please try again.",
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
            <p className="text-muted-foreground">Enter your email and password to access your account</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="userType">I am a:</Label>
              <Select defaultValue="carrier" onValueChange={handleUserTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="carrier">Carrier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline" tabIndex={3}>
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={
                !!errors.email || !!errors.password || formData.email === "" || formData.password === ""
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
