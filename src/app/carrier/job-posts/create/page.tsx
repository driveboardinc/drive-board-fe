'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JobPostForm } from '@/components/carrier/job-posts/JobPostForm';
import CandidateRequirements from '@/components/carrier/job-posts/CandidateRequirements';
import PreScreeningQuestions from '@/components/carrier/job-posts/PreScreeningQuestions';
import SponsoredJobAd from '@/components/carrier/job-posts/SponsoredJobAd';

export default function JobPostingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-1/4 h-2 rounded-full ${
                    step <= currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-center text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          {currentStep === 1 && <JobPostForm />}
          {currentStep === 2 && <CandidateRequirements />}
          {currentStep === 3 && <PreScreeningQuestions />}
          {currentStep === 4 && <SponsoredJobAd />}

          <div className="flex justify-between mt-6">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button onClick={nextStep} disabled={currentStep === totalSteps}>
              {currentStep === totalSteps ? 'Submit' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
