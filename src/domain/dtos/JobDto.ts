import { JobStatus, JobType } from "../entities/Job";

export class JobDto {
  id!: string;
  type!: JobType;
  priceInPence!: number;
  contactEmail?: string;
  status!: JobStatus;
  createdAt!: Date;
  updatedAt?: Date;
}
