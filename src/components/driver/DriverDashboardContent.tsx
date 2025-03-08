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
import { ArrowLeft, X } from "lucide-react";
import type { Job, SortOption } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { experienceLevelOptions, vehicleTypes } from "@/schema/jobPostSchema";

export function DriverDashboardContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [experienceFilter, setExperienceFilter] = useState<string>("All");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("date");

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

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.carrier.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());
      const matchesExperience = experienceFilter === "All" || job.experience_level === experienceFilter;
      const matchesVehicleType = vehicleTypeFilter === "All" || job.vehicle_type.includes(vehicleTypeFilter);

      return matchesSearch && matchesLocation && matchesExperience && matchesVehicleType;
    });

    // Sort the filtered jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "pay":
          return b.salary - a.salary;
        case "date":
          return new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime();
        case "az":
          return a.title.localeCompare(b.title);
        case "location":
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, locationTerm, experienceFilter, vehicleTypeFilter, sortBy]);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setIsMobileDetailOpen(true);
  };

  const activeFilters = [
    { name: "Experience", value: experienceFilter },
    { name: "Vehicle Type", value: vehicleTypeFilter },
  ].filter((filter) => filter.value !== "All");

  const clearAllFilters = () => {
    setExperienceFilter("All");
    setVehicleTypeFilter("All");
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center">Loading jobs...</div>
      ) : (
        <>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E2330] mb-4">Job Listing</h1>
          <JobSearch
            searchTerm={searchTerm}
            locationTerm={locationTerm}
            onSearchChange={setSearchTerm}
            onLocationChange={setLocationTerm}
            onSubmit={() => {
              /* Handle search submission */
            }}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="space-y-4 mb-6 mt-4">
            <div className="flex flex-wrap gap-4">
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Experience</SelectItem>
                  {experienceLevelOptions.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Vehicle Types</SelectItem>
                  {vehicleTypes.map((type: (typeof vehicleTypes)[number]) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active Filters:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter.name}
                    variant="secondary"
                    className="flex items-center gap-1 bg-[#F0F4F8] text-[#5A6B87]"
                  >
                    {filter.name}: {filter.value}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => {
                        switch (filter.name) {
                          case "Experience":
                            setExperienceFilter("All");
                            break;
                          case "Vehicle Type":
                            setVehicleTypeFilter("All");
                            break;
                        }
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#6B5ECD] hover:text-[#5a4eb8]"
                  onClick={clearAllFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-[#1E2330]">Available Job Postings</h2>
              <p className="text-sm text-gray-500">{filteredJobs.length} jobs found</p>
            </div>
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
      )}
    </>
  );
}
