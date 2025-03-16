import { z } from "zod";
import { tableJobPostSchema } from "../schema/jobPostSchema";
import { Dispatch, SetStateAction } from "react";

export interface JobPostFormProps {
  setShowDialog: ((show: boolean) => void) | Dispatch<SetStateAction<boolean>>;
  post?: z.infer<typeof tableJobPostSchema>;
}
