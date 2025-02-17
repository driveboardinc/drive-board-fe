export interface Job {
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
