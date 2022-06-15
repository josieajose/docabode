import { IJob } from "../../entities/Job";
import { AddJobDto } from "../../dtos/AddJobDto";
import { UpdateJobDto } from "../../dtos/UpdateJobDto";

export interface IJobRepository {
  findAll(): IJob[];
  findById(id: string): IJob;
  add(job: AddJobDto): IJob;
  update(id: string, data: UpdateJobDto): IJob;
  delete(id: string): void;
}
