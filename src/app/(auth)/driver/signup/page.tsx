"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Truck } from "lucide-react";
import { questions, type Question, type FormData } from "@/constants/questions";
import { SignupVector } from "@/components/svg-vector/signup-vector";

const getVisibleQuestions = (questions: Question[], formData: FormData) => {
  return questions.filter((question) => {
    if (!question.conditional) return true;
    return question.conditional(formData);
  });
};

export default function SignupPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const visibleQuestions = getVisibleQuestions(questions, formData);
  const question = visibleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100;

  const handleNext = () => {
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string, id: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiEndpoint = "http://ec2-3-85-162-187.compute-1.amazonaws.com:8000/api/driver/profile/";
    const token = localStorage.getItem("authToken"); // If authentication is needed

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // If required
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text(); // Get raw response

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseText}`);
      }
    } catch (error) {
      console.error("%cFailed to submit form:", "color: red; font-weight: bold;", error);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
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
              ) : (
                <Input
                  id={question.id}
                  type={question.type}
                  onChange={handleInputChange}
                  value={formData[question.id] || ""}
                  placeholder={question.placeholder}
                  required
                  className="w-full h-12"
                />
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
      </div>
    </div>
  );
}
