"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import { mock_jobs } from "@/constants/mockData";
import { JobSearch } from "@/components/driver/JobSearch";
import { JobCard } from "@/components/driver/JobCard";
import { JobDetails } from "@/components/driver/JobDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Job } from "@/types";

export function DriverDashboardContent() {
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

      console.log(JSON.stringify(mock_jobs, null, 2));
    };

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

  const sendJobsToBackend = async () => {
    try {
      const response = await fetch("https://your-backend-api.com/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mock_jobs),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Tawagan ang function na ito kung kinakailangan
  sendJobsToBackend();

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E2330]">Driver Dashboard</h1>
      <JobSearch
        searchTerm={searchTerm}
        locationTerm={locationTerm}
        onSearchChange={setSearchTerm}
        onLocationChange={setLocationTerm}
        onSubmit={() => {
          /* Handle search submission */
        }}
      />

      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#1E2330]">Available Job Postings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollArea className="h-[700px]">
            <div className="space-y-4 pr-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selectedJob?.id === job.id}
                  onSelect={handleJobSelect}
                />
              ))}
            </div>
          </ScrollArea>

          <div className="relative hidden lg:block">
            {selectedJob ? (
              <JobDetails job={selectedJob} />
            ) : (
              <div className="p-6 text-center text-[#5A6B87]">Select a job to view details</div>
            )}
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
    </>
  );
}
