"use client";
import { Button } from "@/components/ui/button";
// import { LoadingBar } from "@/components/loading-bar";
// import { useState } from "react";
// import { useEffect } from "react";

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
      <div className="flex items-center justify-center">
        <div className="space-y-6 max-w-[600px] flex flex-col items-center justify-center jus">
          <h1 className="text-[60px] text-center font-bold tracking-tighter leading-[60px]  text-custom-black">
            Building Your Next Tech-Driven Transportation Job Board
          </h1>
          <p className="text-lg text-center text-muted-foreground ">
            Simplifying the hiring process for transportation companies and helping drivers find their next
            opportunity. The most advanced job and load board platform for the modern trucking industry.
          </p>
          <Button className="text-white px-8">Join Drive Board</Button>
        </div>
      </div>
    </section>
  );
}
