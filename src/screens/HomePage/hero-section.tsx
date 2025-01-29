"use client";
import { Button } from "@/components/ui/button";
// import { LoadingBar } from "@/components/loading-bar";
// import { useState } from "react";
// import { useEffect } from "react";
import Image from "next/image";

export function HeroSection() {
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  return (
    <section className="py-12 md:py-24">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[90deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="container pl-40">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ">
          <div className="space-y-6  pr-2">
            <h1 className="text-[60px]  font-bold tracking-tighter leading-[60px]  text-custom-black">
              Building Your Next Tech-Driven Transportation Job Board
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Simplifying the hiring process for transportation companies and helping drivers find their next
              opportunity. The most advanced job and load board platform for the modern trucking industry.
            </p>
            <Button className="text-white px-8">Join Drive Board</Button>
          </div>
          <div className="relative h-[400px] lg:h-[500px] ">
            <Image
              src="/uploads/truckhero.png"
              alt="Fleet of modern white trucks"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
