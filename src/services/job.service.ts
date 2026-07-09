import { api } from "@/config/api";
import type { CreateJobPayload, JobResponse } from "@/types/job.types";

export const postJob = async (
  payload: CreateJobPayload,
): Promise<JobResponse> => {
  const { data } = await api.post("/jobs", payload);

  return data.data;
};

export const getCustomerJobs = async (): Promise<JobResponse[]> => {
  const { data } = await api.get(`/jobs/my`);

  return data.data;
};

export const getCustomerJobById = async (id: string): Promise<JobResponse> => {
  const { data } = await api.get(`/jobs/${id}`);

  return data.data;
};
