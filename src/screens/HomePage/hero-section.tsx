"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingBar } from "@/components/loading-bar";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { WaitingListForm } from "@/components/waiting-list-form";

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div className="py-12 sm:py-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 aspect-video w-full max-w-full mx-auto rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" poster="/thumbnail.webp" controls>
                <source src="https://example.com/placeholder-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-custom-black sm:text-6xl">
              Building Your Next Tech-Driven Transportation Job Board
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Simplifying the hiring process for transportation companies and helping drivers find their next
              opportunity. The most advanced job and load board platform for the modern trucking industry.
            </p>
            <div className="mt-8 w-full max-w-md mx-auto">
              <LoadingBar />
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    Join Waiting List
                    <ArrowRight className="ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogTitle>Join Waiting List</DialogTitle>
                  <WaitingListForm onClose={() => setIsOpen(false)} />
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
