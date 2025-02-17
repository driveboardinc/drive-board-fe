"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Truck } from "lucide-react";

interface LoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number;
  color?: string;
  height?: string;
}

export function LoadingBar({
  progress = 10,
  color = "bg-[#5A4EB8]",
  height = "h-3", // Smaller height for the loading bar
  className,
  ...props
}: LoadingBarProps) {
  return (
    <div className="relative w-full" {...props}>
      <div className={cn("w-full bg-purple-200 rounded-full overflow-hidden", height, className)}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-in-out", color)}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
        style={{
          left: `${progress}%`,
          transform: `translate(-10%, -50%)`,
        }}
      >
        <Truck className="text-[#5A4EB8] " size={48} />
      </div>
    </div>
  );
}
