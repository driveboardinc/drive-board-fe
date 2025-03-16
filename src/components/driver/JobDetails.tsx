"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, DollarSign, Users, Globe, Languages, Clock, Calendar, Building2 } from "lucide-react";

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

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  return (
    <Card className="bg-white border-[#D0DDE9] shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#6B5ECD] to-[#8677D9] text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold mb-2">{job.title}</CardTitle>
            <p className="text-xl opacity-90">
              {job.no_of_openings} {job.no_of_openings === 1 ? "opening" : "openings"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.job_type_names.map((type) => (
              <Badge key={type} variant="secondary" className="text-sm px-3 py-1">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem icon={<MapPin className="w-5 h-5" />} label="Location" value={job.location} />
          <InfoItem
            icon={<DollarSign className="w-5 h-5" />}
            label="Salary Range"
            value={`$${job.min_pay} - $${job.max_pay}/hr`}
          />
          <InfoItem icon={<Calendar className="w-5 h-5" />} label="Working Days" value={job.working_days} />
          <InfoItem
            icon={<Users className="w-5 h-5" />}
            label="Openings"
            value={job.no_of_openings.toString()}
          />
          <InfoItem icon={<Globe className="w-5 h-5" />} label="Country" value={job.country} />
          <InfoItem
            icon={<Languages className="w-5 h-5" />}
            label="Languages"
            value={job.language_names.join(", ")}
          />
          <InfoItem icon={<Clock className="w-5 h-5" />} label="Shift" value={job.shift} />
          <InfoItem
            icon={<Building2 className="w-5 h-5" />}
            label="Experience"
            value={job.experience_level_names.join(", ")}
          />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-[#1E2330] mb-2">Job Description</h3>
          <p className="text-[#5A6B87] whitespace-pre-wrap">{job.description}</p>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-[#1E2330] mb-2">Application Requirements</h3>
          <ul className="list-disc pl-5 text-[#5A6B87]">
            {job.require_resume && <li>Resume required</li>}
            {job.background_check_required && <li>Background check required</li>}
            <li>Application methods: {job.application_method_names.join(", ")}</li>
            {job.fair_chance_hiring && <li>Fair chance hiring</li>}
          </ul>
        </div>

        <Button
          className="w-full bg-[#6B5ECD] hover:bg-[#5a4eb8] text-white text-lg py-6 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
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

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-[#6B5ECD]">{icon}</div>
      <div>
        <p className="text-sm font-medium text-[#1E2330]">{label}</p>
        <p className="text-sm text-[#5A6B87]">{value}</p>
      </div>
    </div>
  );
}
