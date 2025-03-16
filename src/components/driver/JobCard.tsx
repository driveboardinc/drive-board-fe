"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Clock, DollarSign } from "lucide-react";

interface Job {
  id: number;
  title: string;
  no_of_openings: number;
  country: string;
  location: string;
  shift: string;
  job_type_names: string[];
  experience_level_names: string[];
  application_method_names: string[];
  language_names: string[];
  working_days: string;
  min_pay: string;
  max_pay: string;
  description: string;
  require_resume: boolean;
  application_updates: boolean;
  allow_contact: boolean;
  fair_chance_hiring: boolean;
  background_check_required: boolean;
}

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onSelect: (job: Job) => void;
}

export function JobCard({ job, isSelected, onSelect }: JobCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary ${
        isSelected ? "border-primary" : "border-border/40"
      }`}
      onClick={() => onSelect(job)}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-1">{job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.job_type_names.map((type) => (
              <Badge key={type} variant="secondary" className="bg-[#F0F4F8] text-[#5A6B87]">
                {type}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{job.shift}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>
                ${job.min_pay} - ${job.max_pay}/hr
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>
              {job.no_of_openings} {job.no_of_openings === 1 ? "opening" : "openings"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
