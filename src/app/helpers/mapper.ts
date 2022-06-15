import { JobDto } from "../../domain/dtos/JobDto";
import { IJob } from "../../domain/entities/Job";

export function mapJobToJobDto(data: IJob | IJob[]): JobDto | JobDto[] {
  if (Array.isArray(data)) {
    const jobs: JobDto[] = [];
    data.forEach((j) => jobs.push(map(j)));
    return jobs;
  }

  return map(data);
}

function map(data: IJob) {
  const job = new JobDto();
  job.id = data.id;
  job.type = data.type;
  job.status = data.status;
  job.priceInPence = data.priceInPence;
  job.createdAt = data.createdAt;
  job.contactEmail = data.contactEmail || undefined;
  job.updatedAt = data.updatedAt || undefined;

  return job;
}
