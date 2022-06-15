import * as Hapi from "@hapi/hapi";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../../controllers/JobController";
import { globalHandler } from "../../helpers/globalHandler";
import {
  createJobValidator,
  idValidator,
  updateJobValidator,
} from "../../validators/JobValidators";

export const jobRoutes: Hapi.ServerRoute[] = [
  {
    path: "/api/v1/jobs",
    method: "GET",
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) =>
      globalHandler(getAllJobs, request, h),
  },
  {
    path: "/api/v1/jobs",
    method: "POST",
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) =>
      globalHandler(createJob, request, h),
    options: {
      validate: {
        payload: createJobValidator,
      },
    },
  },
  {
    path: "/api/v1/jobs/{id}",
    method: "GET",
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) =>
      globalHandler(getJobById, request, h),
    options: {
      validate: {
        params: idValidator,
      },
    },
  },
  {
    path: "/api/v1/jobs/{id}",
    method: "PATCH",
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) =>
      globalHandler(updateJob, request, h),
    options: {
      validate: {
        params: idValidator,
        payload: updateJobValidator,
      },
    },
  },
  {
    path: "/api/v1/jobs/{id}",
    method: "DELETE",
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) =>
      globalHandler(deleteJob, request, h),
    options: {
      validate: {
        params: idValidator,
      },
    },
  },
];
