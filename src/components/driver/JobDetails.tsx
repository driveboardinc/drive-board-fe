import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types"; // Import the Job type

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  return (
    <Card className="bg-white border-[#D0DDE9] sticky top-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl text-[#1E2330]">{job.title}</CardTitle>
        <p className="text-lg font-semibold text-[#5A6B87]">{job.carrier.name}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-[#1E2330] mb-2">Location</h3>
          <p className="text-[#5A6B87]">{job.location}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#1E2330] mb-2">Salary</h3>
          <p className="text-[#5A6B87]">${job.salary.toLocaleString()} per year</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#1E2330] mb-2">Job Description</h3>
          <p className="text-[#5A6B87] whitespace-pre-wrap">{job.description}</p>
        </div>
        <Button
          className="w-full bg-[#6B5ECD] hover:bg-[#5a4eb8] text-white"
          onClick={() => {
            // Handle apply action
          }}
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
}
