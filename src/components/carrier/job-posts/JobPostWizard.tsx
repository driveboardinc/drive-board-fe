"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobPostForm } from "../table/JobPostForm";
import PreScreeningQuestions from "./PreScreeningQuestions";
import SponsoredJobAd from "./SponsoredJobAd";
import { useCreateJobPostMutation } from "@/store/api/jobPostApiSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { JobPostFormData } from "@/schema/jobPostSchema";

interface FormData {
  jobDetails: JobPostFormData;
  preScreeningQuestions: Array<{
    type: "yes-no" | "short" | "long";
    question: string;
    isDealBreaker?: boolean;
  }>;
  sponsorship: {
    isSponsored: boolean;
    badges: string[];
    isPremier: boolean;
  };
}

type WizardData = {
  jobDetails?: JobPostFormData;
  preScreeningQuestions?: Array<{
    type: "yes-no" | "short" | "long";
    question: string;
    isDealBreaker?: boolean;
  }>;
  sponsorship?: {
    isSponsored: boolean;
    badges: string[];
    isPremier: boolean;
  };
};

export default function JobPostWizard() {
  const [createPost] = useCreateJobPostMutation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    jobDetails: {
      job_title: "",
      job_description: "",
      num_openings: 1,
      location: "",
      shift: "Day",
      job_type: ["Full-time"],
      day_range: "",
      vehicle_type: "Box Truck",
      pay: {
        type: "Range",
        minimum: 0,
        maximum: 0,
        rate: "per hour",
      },
      experience_level: "3 years",
      benefits: [],
      customized_pre_screening: [],
      qualifications: [],
      required_resume: true,
      application_updates: "",
      candidates_contact_you: true,
      background_check: false,
      application_method: ["email"],
      language: ["en"],
    },
    preScreeningQuestions: [],
    sponsorship: {
      isSponsored: false,
      badges: [],
      isPremier: false,
    },
  });

  const handleNext = (data?: WizardData) => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, value ?? prev[key as keyof FormData]])
        ),
      }));
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      // Transform the data to match API requirements
      const postData = {
        ...formData.jobDetails,
        title: formData.jobDetails.job_title,
        description: formData.jobDetails.job_description,
        experience_level: [formData.jobDetails.experience_level],
        application_updates: formData.jobDetails.application_updates === "" ? false : true,
        customized_pre_screening: formData.preScreeningQuestions,
        is_sponsored: formData.sponsorship.isSponsored,
        badges: formData.sponsorship.badges,
        is_premier: formData.sponsorship.isPremier,
        // Remove fields that aren't expected by the API
        job_title: undefined,
        job_description: undefined,
      };

      await createPost(postData).unwrap();
      toast.success("Job post created successfully");
      router.push("/carrier/job-posts");
    } catch (error: unknown) {
      const err = error as { data?: { detail?: string; [key: string]: unknown } };
      console.error("Failed to create job post:", err);
      toast.error(err?.data?.detail || "Failed to create job post");
    }
  };

  return (
    <div className=" mx-auto px-2">
      <div className="mb-8 sticky top-0 bg-background z-10 pb-4">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((number) => (
            <div key={number} className={`flex items-center ${number !== 3 ? "flex-1" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {number}
              </div>
              {number !== 3 && (
                <div className={`h-1 flex-1 mx-2 ${step > number ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Job Details</span>
          <span>Pre-Screening</span>
          <span>Visibility Options</span>
        </div>
      </div>

      <div className="mt-6 h-[calc(100vh-200px)] overflow-y-auto">
        {step === 1 && (
          <JobPostForm
            onSave={(data) => handleNext({ jobDetails: data })}
            isWizard={true}
            setShowDialog={(setShowDialog) => setShowDialog}
          />
        )}
        {step === 2 && (
          <div>
            <PreScreeningQuestions onSave={(questions) => handleNext({ preScreeningQuestions: questions })} />
            <div className="flex justify-between mt-6 sticky bottom-0 bg-background py-4">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={() => handleNext()}>Next</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <SponsoredJobAd
              onSave={(sponsorData) => {
                setFormData((prev) => ({ ...prev, sponsorship: sponsorData }));
                handleSubmit();
              }}
            />
            <div className="flex justify-between mt-6 sticky bottom-0 bg-background py-4">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Post Job</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
