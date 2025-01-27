"use client";

import type React from "react";
import { cn } from "@/lib/utils";

interface LoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number;
  color?: string;
  height?: string;
}

export function LoadingBar({
  progress,
  color = "bg-gradient-to-r from-[#ff80b5] to-[#9089fc]",
  height = "h-2",
  className,
  ...props
}: LoadingBarProps) {
  return (
    <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", height, className)} {...props}>
      <div
        className={cn("h-full rounded-full transition-all duration-500 ease-in-out", color)}
        style={{
          width: progress ? `${progress}%` : "100%",
          animation: progress ? "none" : "loading 2s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
