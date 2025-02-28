"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonSelectProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ButtonSelect({ options, value, onChange, className }: ButtonSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange(optionValue);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={selectedValue === option.value ? "default" : "outline"}
          className={cn(
            "flex-1 min-w-[120px]",
            selectedValue === option.value ? "bg-primary text-primary-foreground" : "bg-background"
          )}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
