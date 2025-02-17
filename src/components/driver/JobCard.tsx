import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icon";
import { MoreVertical, Heart } from "lucide-react";
import { CustomBadge } from "@/components/ui/CustomBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Job } from "@/types";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: (job: Job) => void;
}

export function JobCard({ job, isSelected, onSelect }: JobCardProps) {
  return (
    <Card
      className={`bg-white border-[#D0DDE9] cursor-pointer transition-colors hover:bg-[#F0F4F8] shadow-none ${
        isSelected ? "border-[#0070F3] bg-[#F0F4F8]" : ""
      }`}
      onClick={() => onSelect(job)}
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg text-[#1E2330] hover:underline">{job.title}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#5A6B87] text-sm">{job.carrier.name}</span>
            <CustomBadge variant="outline" color="blue">
              {job.location}
            </CustomBadge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              Save job
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.share className="mr-2 h-4 w-4" />
              Share job
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.flag className="mr-2 h-4 w-4" />
              Report job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <CustomBadge variant="outline" color="green">
              ${job.salary.toLocaleString()} per year
            </CustomBadge>
            <CustomBadge variant="outline" color="green">
              {job.job_type}
            </CustomBadge>
            <CustomBadge variant="outline" color="green">
              {job.status}
            </CustomBadge>
          </div>
          <p className="text-[#5A6B87] text-sm line-clamp-2">{job.description}</p>
          <p className="text-[#5A6B87] text-xs">Active {job.posted_at}</p>
        </div>
      </CardContent>
    </Card>
  );
}
