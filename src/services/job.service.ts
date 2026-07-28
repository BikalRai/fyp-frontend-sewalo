import { api } from "@/config/api";
import type { PlaceBidRequestDto } from "@/types/bid.types";
import type { CreateJobPayload, JobResponse } from "@/types/job.types";

// customer/home owner
export const postJob = async (
  payload: CreateJobPayload,
): Promise<JobResponse> => {
  const { data } = await api.post("/jobs", payload);

  return data.data;
};

export const getAllJobs = async (): Promise<JobResponse[]> => {
  const { data } = await api.get("/jobs/admin/all");

  return data.data;
};

export const getCustomerJobs = async (): Promise<JobResponse[]> => {
  const { data } = await api.get(`/jobs/my`);

  return data.data;
};

export const getCustomerJobById = async (id: string): Promise<JobResponse> => {
  const { data } = await api.get(`/jobs/my/${id}`);

  return data.data;
};

export const cancelJobPost = async (id: string): Promise<JobResponse> => {
  const { data } = await api.patch(`/jobs/${id}/cancel`);

  return data.data;
};

// provider
export const getProviderJobLeads = async (): Promise<JobResponse[]> => {
  const { data } = await api.get("/jobs");

  return data.data;
};

export const getJobLead = async (id: string): Promise<JobResponse> => {
  const { data } = await api.get(`/jobs/${id}`);

  return data.data;
};

export const unlockJob = async (id: string): Promise<JobResponse> => {
  const { data } = await api.post(`/jobs/${id}/unlock`);

  return data.data;
};

export const placeBid = async (
  jobId: string,
  payload: PlaceBidRequestDto,
): Promise<JobResponse> => {
  const { data } = await api.post(`/jobs/${jobId}/bids`, payload);

  return data.data;
};

export const getProviderJobsList = async (): Promise<JobResponse[]> => {
  const { data } = await api.get("/jobs/my/job-list");

  return data.data;
};
