"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MapPin, MoreVertical, Heart, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "react-responsive";
import { mock_jobs } from "@/constants/mockData";

interface Job {
  id: string;
  title: string;
  description: string;
  carrier: {
    name: string;
  };
  location: string;
  salary: number;
  job_type: string;
  status: string;
  posted_at: string;
}

export default function DriverDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setJobs(mock_jobs);
      setFilteredJobs(mock_jobs);
      if (mock_jobs.length > 0) {
        setSelectedJob(mock_jobs[0]);
      }

      setIsLoading(false);
    };
    console.log("Jobs Data", mock_jobs);

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.carrier.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());
      return matchesSearch && matchesLocation;
    });
    setFilteredJobs(filtered);
  }, [jobs, searchTerm, locationTerm]);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setIsMobileDetailOpen(true);
  };

  const JobDetails = ({ job }: { job: Job }) => (
    <>
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
            if (selectedJob) {
              console.log(`Applying for job: ${selectedJob.id}`);
            }
          }}
        >
          Apply Now
        </Button>
      </CardContent>
    </>
  );

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 xl:px-[256px]">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E2330]">Driver Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Job title, keywords, or company"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="City, state, zip code, or 'remote'"
            className="pl-9"
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
          />
        </div>
        <Button className="bg-[#6B5ECD] hover:bg-[#5a4eb8] text-white px-8 w-full sm:w-auto">
          Find jobs
        </Button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#1E2330]">Available Job Postings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollArea className="h-[600px] md:h-[700px]">
            <div className="space-y-4 pr-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={`bg-white border-[#D0DDE9] cursor-pointer transition-colors hover:bg-[#F0F4F8] shadow-none ${
                    selectedJob?.id === job.id ? "border-[#0070F3] bg-[#F0F4F8]" : ""
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-[#1E2330] hover:underline">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#5A6B87] text-sm">{job.carrier.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {job.location}
                        </Badge>
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
                        <Badge variant="outline" className="bg-[#E5F5EA] text-[#027A48] border-[#027A48]">
                          ${job.salary.toLocaleString()} per year
                        </Badge>
                        <Badge variant="outline" className="bg-[#E5F5EA] text-[#027A48] border-[#027A48]">
                          {job.job_type}
                        </Badge>
                        <Badge variant="outline" className="bg-[#E5F5EA] text-[#027A48] border-[#027A48]">
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-[#5A6B87] text-sm line-clamp-2">{job.description}</p>
                      <p className="text-[#5A6B87] text-xs">Active {job.posted_at}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="relative hidden lg:block">
            <Card className="bg-white border-[#D0DDE9] sticky top-0 shadow-none">
              {selectedJob ? (
                <JobDetails job={selectedJob} />
              ) : (
                <CardContent className="p-6 text-center text-[#5A6B87]">
                  Select a job to view details
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>

      {isMobile && (
        <Sheet open={isMobileDetailOpen} onOpenChange={setIsMobileDetailOpen}>
          <SheetContent side="bottom" className="h-[85vh] pt-6">
            <SheetHeader className="flex flex-row items-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-4"
                onClick={() => setIsMobileDetailOpen(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <SheetTitle className="text-center">Job Details</SheetTitle>
            </SheetHeader>
            <div className="mt-8">{selectedJob && <JobDetails job={selectedJob} />}</div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
