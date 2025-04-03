"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonSelect } from "@/components/ui/button-select";
import { LocationAutocomplete } from "@/components/ui/location-autocomplete";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Truck } from "lucide-react";
import { questions, type Question, type FormData } from "@/constants/questions";
import { SignupVector } from "@/components/svg-vector/signup-vector";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDriverSignupMutation } from "@/store/api/authDriverApiSlice";
import { useToast } from "@/hooks/useToast";
import { ROUTE } from "@/constants/ROUTE";
import type { Error } from "@/interface/IErrorType";

const getVisibleQuestions = (questions: Question[], formData: FormData) => {
  return questions.filter((question) => {
    if (!question.conditional) return true;
    return question.conditional(formData);
  });
};

export default function SignupPage() {
  const toast = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({ userType: "driver" });
  const router = useRouter();
  const [driverSignup] = useDriverSignupMutation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const visibleQuestions = [
    {
      id: "userType",
      label: "I am signing up as a:",
      type: "select",
      placeholder: "Select user type",
      options: [
        { value: "driver", label: "Driver" },
        { value: "carrier", label: "Carrier" },
      ],
    },
    ...getVisibleQuestions(questions, formData),
  ];
  const question = visibleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100;

  useEffect(() => {
    if (
      question?.type === "text" ||
      question?.type === "email" ||
      question?.type === "password" ||
      question?.type === "number" ||
      question?.type === "date"
    ) {
      inputRef.current?.focus();
    }
  }, [question?.type]);

  const handleNext = () => {
    const currentQ = visibleQuestions[currentQuestion];
    if (currentQ.required && !formData[currentQ.id]) {
      toast.error({
        title: "Required Field",
        description: `Please fill in ${currentQ.label.toLowerCase()} before proceeding.`,
      });
      return;
    }

    if (currentQuestion < visibleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSelectChange = (value: string, id: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleButtonSelectChange = (value: string, id: string) => {
    setFormData({ ...formData, [id]: value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLocationChange = (value: string, locationData: any) => {
    console.log("Location selected:", value, locationData);
    setFormData({
      ...formData,
      zip_code: value,
      city: locationData.city,
      state: locationData.state,
      location: locationData.formatted_address,
      locationData: locationData,
    });
  };

  const handleUserTypeChange = (value: string) => {
    setFormData({ ...formData, userType: value });
    router.push(value === "driver" ? "/driver/signup" : "/carrier/signup");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission on Enter
      if (currentQuestion === visibleQuestions.length - 1) {
        handleSubmit(e as unknown as React.FormEvent); // Submit if on the last question
      } else {
        handleNext(); // Otherwise, go to the next question
      }
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const requiredFields = visibleQuestions.filter((q) => q.required).map((q) => q.id);
    requiredFields.push("email", "password", "recent_felony", "past_felony"); // Ensure these fields are required

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error({
        title: "Missing required fields",
        description: "Please fill in all required fields before submitting.",
      });
      return;
    }

    try {
      const response = await driverSignup({
        ...formData,
        email: formData.email,
        password: formData.password,
        is_driver: true,
        is_carrier: false,
        user: formData.userId, // Ensure this is the correct pk value
      }).unwrap();

      if (response.email) {
        toast.success({
          title: "Sign up successful",
          description: "Your account has been created. Please sign in to continue.",
        });

        router.push(ROUTE.DRIVER.SIGNIN);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.log("Full error details:", err); // Add this debug log

      if (err && err.originalStatus) {
        if (err.originalStatus === 400) {
          // Log the actual validation errors from the API
          console.log("Validation errors:", err.data);
        } else if (err.originalStatus === 409) {
          toast.error({
            title: "Account Already Exists",
            description: "An account with this email already exists. Please sign in instead.",
          });
        } else {
          toast.error({
            title: "Sign up failed",
            description: "An unexpected error occurred. Please try again later.",
          });
        }
      } else {
        toast.error({
          title: "Sign up failed",
          description: "An unexpected error occurred. Please try again later.",
        });
      }
      console.error("Signup error:", err);
    }
  }

  return (
    <div className="w-full h-screen flex items-center overflow-hidden bg-white shadow-xl">
      <div className="w-1/2 h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
        <SignupVector className="w-full h-auto max-h-[80vh]" />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-start p-8">
        <div className="flex items-center gap-2 py-2">
          <Truck className="w-10 h-10 text-custom-purple" />
          <h1 className="text-3xl font-bold text-gray-800">Drive. Earn. Succeed.</h1>
        </div>

        <Progress value={progress} className="mb-6" />
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {currentQuestion === 0 && (
                <>
                  <Label htmlFor="userType" className="text-lg font-medium text-gray-700">
                    I am signing up as a:
                  </Label>
                  <Select defaultValue="driver" onValueChange={handleUserTypeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="carrier">Carrier</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              {currentQuestion > 0 && (
                <>
                  <Label htmlFor={question.id} className="text-lg font-medium text-gray-700">
                    {question.label}
                  </Label>
                  {question.type === "select" ? (
                    <Select onValueChange={(value) => handleSelectChange(value, question.id)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={question.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {question.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : question.type === "button-select" ? (
                    <ButtonSelect
                      options={question.options || []}
                      value={formData[question.id]}
                      onChange={(value) => handleButtonSelectChange(value, question.id)}
                      className="mt-2"
                    />
                  ) : question.type === "location" ? (
                    <LocationAutocomplete
                      id={question.id}
                      label=""
                      value={formData.zip_code || ""}
                      onChange={handleLocationChange}
                      onLocationSelect={() => {
                        // Only proceed if we have valid location data
                        if (formData.city && formData.state) {
                          handleNext();
                        }
                      }}
                      placeholder={question.placeholder}
                      required={question.required}
                    />
                  ) : (
                    <Input
                      ref={inputRef}
                      id={question.id}
                      type={question.type}
                      onChange={handleInputChange}
                      value={formData[question.id] || ""}
                      placeholder={question.placeholder}
                      required={question.required}
                      className="w-full h-12"
                    />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="w-24"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {currentQuestion === visibleQuestions.length - 1 ? (
              <Button type="submit" className="w-24">
                Submit <Check className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleNext} className="w-24">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
        <div className="mt-6 ">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href={formData.userType === "driver" ? "/driver/signin" : "/carrier/signin"}
              className="text-custom-purple font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
