import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Job } from "@/types";
import {
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Globe,
  Languages,
  Clock,
  Sun,
  Briefcase,
  Truck,
} from "lucide-react";

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  console.log(job);

  return (
    <Card className="bg-white border-[#D0DDE9] shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#6B5ECD] to-[#8677D9] text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold mb-2">{job.title}</CardTitle>
            <p className="text-xl opacity-90">{job.carrier.name}</p>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {job.job_type.join(", ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem icon={<MapPin className="w-5 h-5" />} label="Location" value={job.location} />
          <InfoItem
            icon={<DollarSign className="w-5 h-5" />}
            label="Salary"
            value={`$${job.salary.toLocaleString()} per year`}
          />
          <InfoItem icon={<Calendar className="w-5 h-5" />} label="Posted At" value={job.posted_at} />
          <InfoItem
            icon={<Users className="w-5 h-5" />}
            label="Openings"
            value={job.num_openings.toString()}
          />
          <InfoItem icon={<Globe className="w-5 h-5" />} label="Country" value={job.country} />
          <InfoItem icon={<Languages className="w-5 h-5" />} label="Language" value={job.language} />
          <InfoItem icon={<Clock className="w-5 h-5" />} label="Shift" value={job.shift} />
          <InfoItem icon={<Sun className="w-5 h-5" />} label="Day Range" value={job.day_range} />
          <InfoItem
            icon={<Briefcase className="w-5 h-5" />}
            label="Experience"
            value={job.experience_level}
          />
          <InfoItem
            icon={<Truck className="w-5 h-5" />}
            label="Vehicle Type"
            value={job.vehicle_type.join(", ")}
          />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-[#1E2330] mb-2">Job Description</h3>
          <p className="text-[#5A6B87] whitespace-pre-wrap">{job.description}</p>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-[#1E2330] mb-2">Qualifications</h3>
          <ul className="list-disc pl-5 text-[#5A6B87]">
            {job.qualifications.map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-[#1E2330] mb-2">Benefits</h3>
          <div className="flex flex-wrap gap-2">
            {job.benefits.map((benefit, index) => (
              <Badge key={index} variant="outline" className="text-[#5A6B87]">
                {benefit}
              </Badge>
            ))}
          </div>
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
