import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobSearchProps {
  searchTerm: string;
  locationTerm: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: () => void;
}

export function JobSearch({
  searchTerm,
  locationTerm,
  onSearchChange,
  onLocationChange,
  onSubmit,
}: JobSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Job title, keywords, or company"
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="City, state, zip code, or 'remote'"
          className="pl-9"
          value={locationTerm}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <Button className="bg-[#6B5ECD] hover:bg-[#5a4eb8] text-white px-8 w-full sm:w-auto" onClick={onSubmit}>
        Find jobs
      </Button>
    </div>
  );
}
