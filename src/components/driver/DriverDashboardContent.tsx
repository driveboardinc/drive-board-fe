"use client";

// import { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/store/store";
import { CountdownTimer } from "@/components/driver/CountdownTimer";

// interface JobResponse {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Job[];
// }

// interface Job {
//   id: number;
//   title: string;
//   no_of_openings: number;
//   country: string;
//   location: string;
//   shift: string;
//   job_type_names: string[];
//   experience_level_names: string[];
//   application_method_names: string[];
//   language_names: string[];
//   working_days: string;
//   min_pay: string;
//   max_pay: string;
//   description: string;
//   require_resume: boolean;
//   application_updates: boolean;
//   allow_contact: boolean;
//   fair_chance_hiring: boolean;
//   background_check_required: boolean;
// }

export function DriverDashboardContent() {
  // const [jobs, setJobs] = useState<Job[]>([]);
  // const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [locationTerm, setLocationTerm] = useState("");
  // const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  // const isMobile = useMediaQuery({ maxWidth: 768 });
  // const [experienceFilter, setExperienceFilter] = useState<string>("All");
  // const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("All");
  // const [sortBy, setSortBy] = useState<"date" | "pay" | "az" | "location">("date");
  // const { accessToken } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         "http://ec2-44-211-136-154.compute-1.amazonaws.com:8000/api/jobs_feed/",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch jobs");
  //       }

  //       const data: JobResponse = await response.json();
  //       setJobs(data.results);
  //       setFilteredJobs(data.results);
  //       if (data.results.length > 0) {
  //         setSelectedJob(data.results[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching jobs:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchJobs();
  // }, [accessToken]);

  // useEffect(() => {
  //   const filtered = jobs.filter((job) => {
  //     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());
  //     const matchesExperience =
  //       experienceFilter === "All" || job.experience_level_names.includes(experienceFilter);
  //     // Note: vehicle type filter might need adjustment since it's not in the API response
  //     const matchesVehicleType = vehicleTypeFilter === "All";

  //     return matchesSearch && matchesLocation && matchesExperience && matchesVehicleType;
  //   });

  //   // Sort the filtered jobs
  //   filtered.sort((a, b) => {
  //     switch (sortBy) {
  //       case "pay":
  //         return Number.parseFloat(b.max_pay) - Number.parseFloat(a.max_pay);
  //       case "az":
  //         return a.title.localeCompare(b.title);
  //       case "location":
  //         return a.location.localeCompare(b.location);
  //       default: // date case would go here if we had posting dates
  //         return 0;
  //     }
  //   });

  //   setFilteredJobs(filtered);
  // }, [jobs, searchTerm, locationTerm, experienceFilter, vehicleTypeFilter, sortBy]);

  // const handleJobSelect = (job: Job) => {
  //   setSelectedJob(job);
  //   setIsMobileDetailOpen(true);
  // };

  // const activeFilters = [
  //   { name: "Experience", value: experienceFilter },
  //   { name: "Vehicle Type", value: vehicleTypeFilter },
  // ].filter((filter) => filter.value !== "All");

  // const clearAllFilters = () => {
  //   setExperienceFilter("All");
  //   setVehicleTypeFilter("All");
  // };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1E2330] mb-4">Job Listing</h1>
      <CountdownTimer
        targetDate={new Date("August 15, 2025")}
        title="Revolutionary Feature Coming Soon!"
        description="We're about to transform your experience with our groundbreaking new feature. Get ready for something extraordinary that will change the way you work."
      />
      {/* 
      {isLoading ? (
        <div className="text-center">Loading jobs...</div>
      ) : (
        <>
          <JobSearch
            searchTerm={searchTerm}
            locationTerm={locationTerm}
            onSearchChange={setSearchTerm}
            onLocationChange={setLocationTerm}
            onSubmit={() => {
              /* Handle search submission *\/}
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
                            setExperienceFilter("All")
                            break
                          case "Vehicle Type":
                            setVehicleTypeFilter("All")
                            break
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
      */}
    </>
  );
}
