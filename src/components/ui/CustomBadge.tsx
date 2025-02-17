import type React from "react";
import { cn } from "@/lib/utils";

interface CustomBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
  color?: "green" | "blue" | "red" | "yellow" | "gray";
}

export function CustomBadge({
  children,
  className,
  variant = "default",
  color = "gray",
  ...props
}: CustomBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "outline" && "border",
        color === "green" && "bg-[#E5F5EA] text-[#027A48] border-[#027A48]",
        color === "blue" && "bg-[#EEF4FF] text-[#1E40AF] border-[#1E40AF]",
        color === "red" && "bg-[#FEE2E2] text-[#991B1B] border-[#991B1B]",
        color === "yellow" && "bg-[#FEF3C7] text-[#92400E] border-[#92400E]",
        color === "gray" && "bg-[#F3F4F6] text-[#1F2937] border-[#1F2937]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
