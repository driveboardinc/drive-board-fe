import { z } from 'zod';
import { tableJobPostSchema } from '../schema/jobPostSchema';

export interface JobPostFormProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  post?: z.infer<typeof tableJobPostSchema>;
}
