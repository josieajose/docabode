import { JobStatus, JobType } from "../entities/Job";

export class AddJobDto {
  type!: JobType;
  priceInPence!: number;
  status!: JobStatus;
  contactEmail?: string;
}
