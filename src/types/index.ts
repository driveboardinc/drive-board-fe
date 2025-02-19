export interface Job {
  id: string;
  title: string;
  description: string;
  carrier: {
    name: string;
    avatar: string;
  };
  location: string;
  salary: number;
  job_type: string[];
  status: string;
  posted_at: string;
  num_openings: number;
  country: string;
  language: string;
  shift: string;
  day_range: string;
  experience_level: string;
  benefits: string[];
  job_description: string;
  customized_pre_screening: string[];
  qualifications: string[];
  application_method: string;
  vehicle_type: string[];
}

export type SortOption = "date" | "pay" | "az" | "location";
