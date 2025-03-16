"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icon";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionPlans() {
  const router = useRouter();
  const toast = useToast();
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinue = async () => {
    if (!selectedPlan) {
      toast.error({
        title: "No plan selected",
        description: "Please select a subscription plan to continue",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedPlan === "premium") {
        // Here you would typically redirect to a payment processor
        // For now, we'll simulate a successful payment
        setTimeout(() => {
          toast.success({
            title: "Premium plan activated",
            description:
              "Your 1-day free trial has started. You will be charged $19.99/month after the trial period.",
          });
          router.replace("/driver");
        }, 1500);
      } else {
        // Free plan selected
        toast.success({
          title: "Free plan activated",
          description: "You can upgrade to premium anytime from your account settings.",
        });
        router.replace("/driver");
      }
    } catch {
      toast.error({
        title: "Error activating plan",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icons.truck className="w-10 h-10 text-custom-purple" />
            <h1 className="text-3xl font-bold text-gray-800">Choose Your Plan</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your needs. You can upgrade or downgrade at any time from your
            account settings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10 ">
          {/* Free Plan */}
          <Card
            className={`border-2 transition-all flex flex-col justify-between ${
              selectedPlan === "free" ? "border-custom-purple ring-2 ring-purple-200" : "border-gray-200"
            }`}
            onClick={() => setSelectedPlan("free")}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Free Account</CardTitle>
              <CardDescription>Basic access to job listings</CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className="bg-gray-100">
                  Free Forever
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Basic job search functionality</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Create and manage your driver profile</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Apply to available job listings</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Limited access to the load board</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={selectedPlan === "free" ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedPlan("free")}
              >
                Select Free Plan
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card
            className={`border-2 transition-all flex flex-col justify-between  ${
              selectedPlan === "premium" ? "border-custom-purple ring-2 ring-purple-200" : "border-gray-200"
            }`}
            onClick={() => setSelectedPlan("premium")}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Premium Account</CardTitle>
              <CardDescription>Full access to all features</CardDescription>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-100 text-custom-purple">
                  1-Day Free Trial
                </Badge>
                <span className="font-bold text-lg">$19.99/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>SMS Alerts when job ads are posted in your area</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Email Alerts when job ads are posted in your area</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Profile is sent to companies DAILY</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Access to hiring manager&apos;s information for direct contact</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Insurance, rental, and travel discounts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Early access to our load board</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={selectedPlan === "premium" ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedPlan("premium")}
              >
                Select Premium Plan
              </Button>
            </CardFooter>
          </Card>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedPlan || isProcessing}
            className="px-10"
          >
            {isProcessing ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
