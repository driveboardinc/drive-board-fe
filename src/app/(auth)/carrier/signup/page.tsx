"use client";

import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/ROUTE";
import { useCarrierSignupMutation } from "@/store/api/authCarrierApiSlice";
import { useToast } from "@/hooks/useToast";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carrierSignupData } from "@/constants/CARRIER_SIGNUP";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { validateField } from "@/lib/form-validation";
import { containerAnimation, childAnimation } from "@/lib/animations";
import { splitWords } from "@/lib/text-utils";
import AuthHeader from "@/components/auth/AuthHeader";
import Link from "next/link";

export default function CarrierSignupPage() {
  const router = useRouter();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    userType: "carrier",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [carrierSignup] = useCarrierSignupMutation();

  const userTypeField = {
    id: "userType",
    type: "select",
    label: "I am signing up as a:",
    emoji: "👤",
    required: true,
    options: ["driver", "carrier"],
    highlight: ["user type"],
  };

  const allFields = [userTypeField, ...carrierSignupData.fields];
  const currentField = allFields[currentStep];
  const totalSteps = allFields.length;

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentField.id]: value,
    }));

    if (currentField.id === "userType") {
      router.push(value === "driver" ? "/driver/signup" : "/carrier/signup");
    }

    const error = validateField(currentField, value);
    setErrors((prev) => ({
      ...prev,
      [currentField.id]: error || "",
    }));
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const error = validateField(currentField, formData[currentField.id] || "");

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [currentField.id]: error,
      }));
      return;
    }

    try {
      // First create the user account
      const userResponse = await carrierSignup({
        email: formData.representative_email,
        password: formData.password,
      }).unwrap();

      console.log("User response:", userResponse);

      if (userResponse.email) {
        // Get the access token by signing in
        const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.representative_email,
            password: formData.password,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.access) {
          // Then create the carrier profile
          const profileResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/carrier/profile/create/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginData.access}`,
              },
              body: JSON.stringify({
                user: userResponse.id,
                company_name: formData.company_name,
                company_mailing_address: formData.company_mailing_address,
                phone_number: formData.representative_phone,
                dot_mc_number: formData.dot_mc_number,
                representative_name: formData.representative_name,
                representative_email: formData.representative_email,
                representative_phone: formData.representative_phone,
                formation_state: formData.formation_state,
                operating_areas: "nationwide",
                specific_states: formData.specific_states || null,
                best_time_to_call: formData.best_time_to_call,
                hiring_preferences: formData.hiring_preferences || "all",
              }),
            }
          );

          if (profileResponse.ok) {
            toast.success({
              title: "Signup successful",
              description: "You have successfully signed up",
            });
            router.push(ROUTE.CARRIER.SIGNIN);
          } else {
            const errorData = await profileResponse.json();
            console.error("Profile creation error:", errorData);
            throw new Error("Profile creation failed");
          }
        } else {
          throw new Error("Failed to get access token");
        }
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);
      toast.error({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  };

  const handleNext = () => {
    const error = validateField(currentField, formData[currentField.id] || "");

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [currentField.id]: error,
      }));
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const currentValue = formData[currentField.id] || "";
      const error = validateField(currentField, currentValue);

      if (currentValue && !error) {
        handleNext();
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
            <h1 className="text-2xl font-bold">Sign up</h1>
            <p className="text-muted-foreground">Create your carrier account</p>
          </div>
          <div className="flex-1  flex justify-center items-center">
            <div className="flex flex-col justify-center w-full">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="w-fit text-muted-foreground hover:text-primary text-base transition-colors mb-4"
                  size="sm"
                >
                  <ArrowLeft /> Back
                </Button>
              )}
              <div className="flex flex-col gap-4 w-full  mb-12">
                <motion.h4
                  key={`title-${currentStep}`}
                  className="text-sm sm:text-base text-muted-foreground font-medium"
                >
                  {carrierSignupData.title}
                </motion.h4>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-start gap-4"
                  >
                    <div className="flex flex-1">
                      <motion.p
                        variants={containerAnimation}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight"
                      >
                        <motion.span variants={childAnimation} className="inline-block">
                          {currentField.emoji}{" "}
                        </motion.span>

                        {currentField.label.split(/\*\*(.*?)\*\*/g).map((part, index) =>
                          index % 2 === 1 ? (
                            <span key={index} className="text-custom-purple">
                              {splitWords(part).map((word, wordIndex) =>
                                word.trim() ? (
                                  <motion.span
                                    key={wordIndex}
                                    variants={childAnimation}
                                    className="inline-block"
                                  >
                                    {word.replace(/_/g, " ")}
                                  </motion.span>
                                ) : (
                                  <span key={wordIndex}>{word}</span>
                                )
                              )}
                            </span>
                          ) : (
                            splitWords(part).map((word, wordIndex) =>
                              word.trim() || word === "_" ? (
                                <motion.span
                                  key={`${index}-${wordIndex}`}
                                  variants={childAnimation}
                                  className="inline-block"
                                >
                                  {word}
                                </motion.span>
                              ) : (
                                <span key={`${index}-${wordIndex}`}>{word}</span>
                              )
                            )
                          )
                        )}
                        {currentField.required && (
                          <motion.span
                            variants={childAnimation}
                            className="text-destructive ml-2 inline-block"
                          >
                            *
                          </motion.span>
                        )}
                      </motion.p>
                    </div>
                    <div className=" w-full">
                      {currentField.type === "select" ? (
                        <Select value={formData[currentField.id]} onValueChange={handleInputChange}>
                          <SelectTrigger
                            className={cn("h-12", errors[currentField.id] && "border-destructive")}
                            onKeyDown={handleKeyPress}
                          >
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentField.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : currentField.type === "datetime-local" ? (
                        <Input
                          className={cn("w-full h-12", errors[currentField.id] && "border-destructive")}
                          type="datetime-local"
                          value={formData[currentField.id] || ""}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />
                      ) : (
                        <Input
                          className={cn("w-full h-12", errors[currentField.id] && "border-destructive")}
                          type={currentField.type}
                          value={formData[currentField.id] || ""}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder={`Enter ${currentField.highlight[0]}`}
                        />
                      )}
                      {errors[currentField.id] && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-destructive text-sm mt-2"
                        >
                          {errors[currentField.id]}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`button-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-between items-center mt-2"
                  >
                    <motion.div
                      variants={containerAnimation}
                      initial="hidden"
                      animate="visible"
                      className="w-full"
                    >
                      <motion.div variants={childAnimation}>
                        <Button onClick={handleNext} className="px-10 h-10 w-full md:w-auto">
                          <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {currentStep === totalSteps - 1 ? "Submit" : "Next"}
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 4 }}
                              whileTap={{ x: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.span>
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 sm:mt-6 w-full">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2 font-medium">
                  <span>
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                  <span className="text-primary">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-custom-purple h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / totalSteps) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>{" "}
          </div>{" "}
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href={ROUTE.CARRIER.SIGNIN} className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
