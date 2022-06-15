import { injectable, inject } from "inversify";

import { IJobService } from "../../boundaries/input/IJobService";
import { IJobRepository } from "../../boundaries/output/IJobRepository";
import { IJob } from "../../entities/Job";
import { TYPES } from "../../types";
import { AddJobDto } from "../../dtos/AddJobDto";
import { UpdateJobDto } from "../../dtos/UpdateJobDto";

import "reflect-metadata";

@injectable()
export class JobService implements IJobService {
  constructor(
    @inject(TYPES.JobRepository) private jobRepository: IJobRepository
  ) {}

  findAll(): IJob[] {
    return this.jobRepository.findAll();
  }

  add(job: AddJobDto): IJob {
    return this.jobRepository.add(job);
  }

  findById(id: string): IJob {
    return this.jobRepository.findById(id);
  }

  update(id: string, data: UpdateJobDto): IJob {
    const job = this.findById(id);
    return this.jobRepository.update(id, data);
  }

  delete(id: string) {
    this.jobRepository.delete(id);
  }
}
