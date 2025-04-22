import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, Calendar } from "lucide-react";

interface JobDetails {
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
  working_days: string | null;
  min_pay: number | null;
  max_pay: number | null;
  description: string;
  require_resume: boolean;
  application_updates: boolean;
  allow_contact: boolean;
  fair_chance_hiring: boolean;
  background_check_required: boolean;
}

interface JobDetailsPanelProps {
  jobDetails: JobDetails;
}

export function JobDetailsPanel({ jobDetails }: JobDetailsPanelProps) {
  const formatSalary = (min: number | null, max: number | null) => {
    if (min === null && max === null) return "Not specified";
    if (min === null) return `Up to $${max?.toLocaleString()}`;
    if (max === null) return `From $${min?.toLocaleString()}`;
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
  };

  return (
    <Card className="h-full border-0 rounded-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{jobDetails.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{jobDetails.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {jobDetails.job_type_names.map((type) => (
              <Badge
                key={type}
                variant="outline"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
              >
                {type}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              <span>
                {jobDetails.no_of_openings} opening{jobDetails.no_of_openings > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span>{jobDetails.shift} shift</span>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Experience: {jobDetails.experience_level_names.join(", ")}</span>
          </div>

          <div className="flex items-center text-sm">
            <div className="w-4 h-4 mr-2 text-gray-500" />
            <span>Salary: {formatSalary(jobDetails.min_pay, jobDetails.max_pay)}</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Job description</h3>
          <p className="text-sm text-gray-700">{jobDetails.description}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Additional information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Application method</span>
              <span>{jobDetails.application_method_names.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resume required</span>
              <span>{jobDetails.require_resume ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Background check</span>
              <span>{jobDetails.background_check_required ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fair chance hiring</span>
              <span>{jobDetails.fair_chance_hiring ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
