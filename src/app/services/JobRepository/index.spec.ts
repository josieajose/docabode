import { JobRepository } from ".";
import { JobStatus, JobType } from "../../../domain/entities/Job";

describe("Job Repository Tests", () => {
  describe("Getting jobs", () => {
    it("should return all jobs", () => {
      const jobRepo = new JobRepository();
      jobRepo.jobs = [
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

      const jobs = jobRepo.findAll();

      expect(jobs).toBeDefined();
      expect(jobs.length).toEqual(jobRepo.jobs.length);
      // Test ordering functionality
      expect(jobs[0]).toMatchObject(jobRepo.jobs[1]);
    });
  });
  describe("Creating Jobs", () => {
    it("should create a job with given data", () => {
      const jobRepo = new JobRepository();
      const job = jobRepo.add({
        type: JobType.ON_DEMAND,
        status: JobStatus.COMPLETED,
        priceInPence: 100,
        contactEmail: "test@test.com",
      });

      expect(job).toBeTruthy();
      expect(job.createdAt).toBeDefined();
      expect(job.id).toBeDefined();
      expect(job).toMatchObject(jobRepo.jobs[0]);
    });
  });
});
