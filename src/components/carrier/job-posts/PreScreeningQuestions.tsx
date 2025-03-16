"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

type Question = {
  type: "yes-no" | "short" | "long";
  question: string;
  isDealBreaker?: boolean;
};

interface PreScreeningQuestionsProps {
  onSave?: (questions: Question[]) => void;
}

export default function PreScreeningQuestions({ onSave }: PreScreeningQuestionsProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentType, setCurrentType] = useState<Question["type"]>("yes-no");
  const [isDealBreaker, setIsDealBreaker] = useState(false);

  const addQuestion = () => {
    if (currentQuestion.trim() && questions.length < 5) {
      const newQuestions = [...questions, { type: currentType, question: currentQuestion, isDealBreaker }];
      setQuestions(newQuestions);
      onSave?.(newQuestions);
      setCurrentQuestion("");
      setCurrentType("yes-no");
      setIsDealBreaker(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pre-Screening Questions</h2>
      <p className="text-sm text-muted-foreground">
        Add up to 5 pre-screening questions for candidates to answer.
        {questions.length}/5 questions added
      </p>

      {questions.length < 5 && (
        <>
          <div>
            <Label htmlFor="question">Enter your question:</Label>
            <Input
              id="question"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Type your question here"
            />
          </div>

          <div>
            <Label>Choose Field Type:</Label>
            <RadioGroup
              value={currentType}
              onValueChange={(value: Question["type"]) => setCurrentType(value)}
            >
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes-no" id="yes-no" />
                  <Label htmlFor="yes-no">Yes or No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Short Question</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long Question</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {currentType === "yes-no" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="deal-breaker"
                checked={isDealBreaker}
                onCheckedChange={(checked) => setIsDealBreaker(checked as boolean)}
              />
              <Label htmlFor="deal-breaker">Is this a Deal-Breaker Question?</Label>
            </div>
          )}

          <Button onClick={addQuestion} disabled={questions.length >= 5 || !currentQuestion.trim()}>
            Add Question
          </Button>
        </>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Added Questions:</h3>
        {questions.map((q, index) => (
          <div key={index} className="bg-muted p-4 rounded-md">
            <p className="font-medium">{q.question}</p>
            <p className="text-sm text-muted-foreground">Type: {q.type}</p>
            {q.type === "yes-no" && q.isDealBreaker && (
              <p className="text-sm text-muted-foreground">Deal-Breaker: Yes</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
