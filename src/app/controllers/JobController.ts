import * as Hapi from "@hapi/hapi";
import { container } from "../ioc";
import { IJobService } from "../../domain/boundaries/input/IJobService";
import { TYPES } from "../../domain/types";

import { AddJobDto } from "../../domain/dtos/AddJobDto";
import { UpdateJobDto } from "../../domain/dtos/UpdateJobDto";
import { mapJobToJobDto } from "../helpers/mapper";

const jobService = container.get<IJobService>(TYPES.JobService);

export function getAllJobs(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const jobs = jobService.findAll();
  return h
    .response({
      data: mapJobToJobDto(jobs),
      success: true,
    })
    .code(200);
}

export function getJobById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const job = jobService.findById(request.params.id);
  return h
    .response({
      data: mapJobToJobDto(job),
      success: true,
    })
    .code(200);
}

export function createJob(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const job = jobService.add(request.payload as AddJobDto);
  return h
    .response({
      data: mapJobToJobDto(job),
      success: true,
    })
    .code(201);
}

export function updateJob(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const job = jobService.update(
    request.params.id,
    request.payload as UpdateJobDto
  );
  return h
    .response({
      data: mapJobToJobDto(job),
      success: true,
    })
    .code(200);
}

export function deleteJob(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  jobService.delete(request.params.id);
  return h
    .response({
      success: true,
    })
    .code(204);
}
