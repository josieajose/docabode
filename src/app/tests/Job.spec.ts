import * as Hapi from "@hapi/hapi";
import { init } from "../server";
import { container } from "../ioc";
import { IJobRepository } from "../../domain/boundaries/output/IJobRepository";
import { TYPES } from "../../domain/types";
import { JobStatus, JobType } from "../../domain/entities/Job";

describe("GET /api/v1/jobs", () => {
  let server: Hapi.Server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("should return all jobs and respond with 200", async () => {
    const jobRepo = container.get<IJobRepository>(TYPES.JobRepository);
    jobRepo.add({
      type: JobType.ON_DEMAND,
      status: JobStatus.COMPLETED,
      priceInPence: 100,
      contactEmail: "test@test.com",
    });
    jobRepo.add({
      type: JobType.SHIFT,
      status: JobStatus.ASSIGNED,
      priceInPence: 200,
      contactEmail: "test1@test1.com",
    });

    const res = await server.inject({
      method: "GET",
      url: "/api/v1/jobs",
    });

    const responseBody = JSON.parse(res.payload);
    expect(res.statusCode).toEqual(200);
    expect(responseBody.success).toEqual(true);
    expect(responseBody.data).toBeDefined();
    expect(responseBody.data).toBeInstanceOf(Array);
    expect(responseBody.data.length).toEqual(2);
  });
});

describe("POST /api/v1/jobs", () => {
  let server: Hapi.Server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("should create a job and respond with 201", async () => {
    const data = {
      type: JobType.ON_DEMAND,
      status: JobStatus.COMPLETED,
      priceInPence: 100,
      contactEmail: "test@test.com",
    };

    const jobRepo = container.get<IJobRepository>(TYPES.JobRepository);

    const res = await server.inject({
      method: "POST",
      url: "/api/v1/jobs",
      payload: data,
    });

    const job = jobRepo.findAll()[0];

    const responseBody = JSON.parse(res.payload);

    expect(res.statusCode).toEqual(201);
    expect(responseBody.success).toEqual(true);
    expect(job).toBeDefined();
    expect(responseBody.data.id).toBeDefined();
    expect(responseBody.data.id).toEqual(job.id);
  });
});
