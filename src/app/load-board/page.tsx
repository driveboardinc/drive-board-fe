"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function WaitingList() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Join the Waiting List to get early access to our Load Board Featuring
        </h2>

        <div className="w-full space-y-2">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-sm text-muted-foreground text-right">{progress}% capacity filled</p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <Button
            variant="default"
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium"
          >
            Join Waiting List
          </Button>
        </form>
      </div>
    </div>
  );
}
