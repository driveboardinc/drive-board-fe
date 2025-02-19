import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SortOption } from "@/types";

interface JobSearchProps {
  searchTerm: string;
  locationTerm: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: () => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function JobSearch({
  searchTerm,
  locationTerm,
  onSearchChange,
  onLocationChange,
  onSubmit,
  sortBy,
  onSortChange,
}: JobSearchProps) {
  const sortOptions = [
    { value: "date", label: "Date Posted" },
    { value: "pay", label: "Pay" },
    { value: "az", label: "A-Z" },
    { value: "location", label: "Location" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
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
      <div className="flex gap-2">
        <Button
          className="bg-[#6B5ECD] hover:bg-[#5a4eb8] text-white px-8 w-full sm:w-auto"
          onClick={onSubmit}
        >
          Find jobs
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option) => (
              <DropdownMenuItem key={option.value} onSelect={() => onSortChange(option.value as SortOption)}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
