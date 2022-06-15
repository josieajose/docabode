import { v4 as uuidv4 } from "uuid";
import { injectable } from "inversify";

import { IJob, Job } from "../../../domain/entities/Job";
import { NotFoundException } from "../../../domain/entities/exceptions";
import { IJobRepository } from "../../../domain/boundaries/output/IJobRepository";
import { AddJobDto } from "../../../domain/dtos/AddJobDto";
import { UpdateJobDto } from "../../../domain/dtos/UpdateJobDto";

import "reflect-metadata";

@injectable()
export class JobRepository implements IJobRepository {
  jobs: IJob[] = [];

  findAll(): IJob[] {
    return [...this.jobs].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  add(jobDto: AddJobDto): IJob {
    // In real world projects we should transform our domain dto to db entity!
    const job = Object.assign(new Job(), {
      ...jobDto,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: null,
    });
    this.jobs.push(job);

    return job;
  }

  findById(id: string): IJob {
    const job = this.jobs.find((j) => j.id === id);
    if (!job) throw new NotFoundException(`Job with ID of ${id} not found!`);
    return job;
  }

  update(id: string, data: UpdateJobDto): IJob {
    const job = this.findById(id);
    Object.assign(job, {
      ...data,
      updatedAt: new Date(),
    });
    const jobIndex = this.jobs.findIndex((j) => j.id === job.id);
    this.jobs[jobIndex] = job;
    return job;
  }

  delete(id: string) {
    const job = this.findById(id);
    this.jobs = this.jobs.filter((j) => j.id !== job.id);
  }
}
