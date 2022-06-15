import { JobStatus } from "../entities/Job";

export class UpdateJobDto {
  contactEmail?: string;
  status!: JobStatus;
}
