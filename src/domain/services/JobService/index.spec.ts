import { v4 as uuidv4 } from "uuid";
import { JobService } from ".";
import { IJobRepository } from "../../boundaries/output/IJobRepository";
import { AddJobDto } from "../../dtos/AddJobDto";
import { JobStatus, JobType } from "../../entities/Job";

describe("Job Service Tests", () => {
  describe("Getting jobs", () => {
    it("should return all jobs", () => {
      const jobs = [
        {
          id: "51eaf76e-ebe9-4e12-9eb0-2230269ee280",
          type: JobType.SHIFT,
          status: JobStatus.AVAILABLE,
          priceInPence: 50,
          createdAt: new Date(),
          contactEmail: "test@test.com",
        },
        {
          id: "65eaf76e-ebe9-4e12-9eb0-2230269ee371",
          type: JobType.ON_DEMAND,
          status: JobStatus.COMPLETED,
          priceInPence: 100,
          createdAt: new Date(new Date().getTime() + 2000),
          contactEmail: "test123@test123.com",
        },
      ];
      const repo = {
        findAll() {
          return jobs;
        },
      };
      const jobService = new JobService(repo as IJobRepository);

      const res = jobService.findAll();

      expect(res).toBeTruthy();
      expect(res.length).toEqual(jobs.length);
      expect(res[0]).toMatchObject(jobs[0]);
    });
  });
  describe("Creating Jobs", () => {
    it("should create a job with given data.", () => {
      const data = {
        type: JobType.ON_DEMAND,
        status: JobStatus.COMPLETED,
        priceInPence: 100,
        contactEmail: "test@test.com",
      };
      const repo = {
        add(data: AddJobDto) {
          return {
            ...data,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: null,
          };
        },
      };
      const jobService = new JobService(repo as IJobRepository);

      const job = jobService.add(data);

      expect(job).toBeTruthy();
      expect(job.id).toBeDefined();
      expect(job.type).toEqual(data.type);
    });
  });
});
