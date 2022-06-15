export enum JobType {
  ON_DEMAND = "ON_DEMAND",
  SHIFT = "SHIFT",
  SCHEDULED = "SCHEDULED",
}

export enum JobStatus {
  AVAILABLE = "AVAILABLE",
  ASSIGNED = "ASSIGNED",
  COMPLETED = "COMPLETED",
}

export interface IJob {
  id: string;
  type: JobType;
  priceInPence: number;
  contactEmail?: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Job implements IJob {
  id!: string;
  type!: JobType;
  priceInPence!: number;
  contactEmail?: string;
  status!: JobStatus;
  createdAt!: Date;
  updatedAt?: Date;
}
