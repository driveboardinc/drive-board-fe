import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icon";
import { MoreVertical, Heart, MapPin, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Job } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: (job: Job) => void;
}

export function JobCard({ job, isSelected, onSelect }: JobCardProps) {
  // Generate a placeholder logo URL based on the company name
  const placeholderLogoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    job.carrier.name
  )}&background=random&color=fff&size=128`;

  return (
    <Card
      className={`bg-white border cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-[#6B5ECD] bg-[#F0F4F8]" : "border-[#D0DDE9]"
      }`}
      onClick={() => onSelect(job)}
    >
      <CardHeader className="flex flex-row items-start justify-between p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage src={job.carrier.avatar || placeholderLogoUrl} alt={job.carrier.name} />
            <AvatarFallback className="font-bold text-lg">
              {job.carrier.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-[#1E2330] hover:text-[#6B5ECD] transition-colors">
              {job.title}
            </CardTitle>
            <p className="text-[#5A6B87] text-sm mt-1">{job.carrier.name}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-[#F0F4F8] text-[#5A6B87]"
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
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1 text-[#6B5ECD]">
              <MapPin className="w-3 h-3" />
              {job.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-[#6B5ECD]">
              <DollarSign className="w-3 h-3" />${job.salary.toLocaleString()} per year
            </Badge>
            <Badge variant="secondary" className="text-[#6B5ECD]">
              {job.job_type}
            </Badge>
          </div>
          <p className="text-[#5A6B87] text-sm line-clamp-2">{job.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-[#5A6B87] text-xs flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Posted {job.posted_at}
            </p>
            <Badge
              variant="outline"
              className={job.status === "Active" ? "text-green-600" : "text-yellow-600"}
            >
              {job.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
