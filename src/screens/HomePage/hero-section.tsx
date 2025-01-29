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
    <div className="">
      {/* <div className="absolute inset-x-0 -top-40  transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div> */}

      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
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
    </div>
  );
}
