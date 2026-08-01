import { jobKeys } from "@/lib/queryKeys";
import {
  cancelJobPost,
  completeJob,
  confirmJobCompletion,
  getAllJobs,
  getCustomerJobById,
  getCustomerJobs,
  getJobLead,
  getProviderJobLeads,
  getProviderJobsList,
  placeBid,
  postJob,
  submitRating,
  unlockJob,
} from "@/services/job.service";
import { uploadImagesToCloudinary } from "@/services/upload.service";
import type { ApiErrorResponse } from "@/types/api.types";
import type { PlaceBidRequestDto } from "@/types/bid.types";
import type {
  CompleteJobPayload,
  CreateJobFormValues,
  CreateJobPayload,
} from "@/types/job.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";
import { toast } from "sonner";

// Home owner actions
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateJobFormValues) => {
      // 1. Upload images concurrently and get the secure URLs back
      const imageUrls = await uploadImagesToCloudinary(data.images);

      // 2. Construct the exact payload for the backend service
      const backendPayload: CreateJobPayload = {
        category: data.category,
        urgency: data.urgency,
        description: data.description, // WHY: Injected here to complete the pipeline
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        phoneNumber: data.phoneNumber,
        images: imageUrls,
      };

      // 3. Delegate to your dedicated API service
      return postJob(backendPayload);
    },
    onSuccess: () => {
      // 4. Invalidate the cache to trigger an automatic refetch
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
};

export const useGetAllJobs = () => {
  return useQuery({
    queryKey: jobKeys.adminAll(),
    queryFn: getAllJobs,
  });
};

export const useCustomerPosts = () => {
  return useQuery({
    queryKey: jobKeys.customerHistory(),
    queryFn: getCustomerJobs,
    refetchInterval: (query) => {
      const hasAnalyzing = query.state.data?.some(
        (job) => job.status === "ANALYZING",
      );
      return hasAnalyzing ? 3000 : false;
    },
    // staleTime: 1000 * 60 * 5
  });
};

export const useCustomerJobDetail = (id: string) => {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => getCustomerJobById(id),
  });
};

export const useCancelJobPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return cancelJobPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.details() });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
};

export const useConfirmJobCompletion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmJobCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.customerHistory() });
    },
  });
};

export const useSubmitRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      payload,
    }: {
      jobId: string;
      payload: { score: number; review?: string };
    }) => submitRating(jobId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: jobKeys.detail(variables.jobId),
      });
      queryClient.invalidateQueries({ queryKey: jobKeys.customerHistory() });
    },
  });
};

// provider
export const useJobLeads = () => {
  return useQuery({
    queryKey: jobKeys.providerFeed(),
    queryFn: getProviderJobLeads,
  });
};

export const useJobLead = (id: string) => {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => getJobLead(id),
  });
};

export const useUnlockJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unlockJob(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage =
        error.response?.data?.details ||
        error.response?.data?.message ||
        "Failed to unlock the job. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const usePlaceBid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. Accept a SINGLE object containing all your arguments
    mutationFn: ({
      jobId,
      payload,
    }: {
      jobId: string;
      payload: PlaceBidRequestDto;
    }) => placeBid(jobId, payload),

    // 2. The second parameter is the exact variables object you passed in
    onSuccess: (_, variables) => {
      // 3. Access the jobId from that object
      queryClient.invalidateQueries({
        queryKey: jobKeys.detail(variables.jobId),
      });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.details ?? "Something went wrong.";
        toast.error(message);
      } else {
        toast.error("Something went wrong.");
      }
    },
  });
};

export const useCompleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      payload,
    }: {
      jobId: string;
      payload: CompleteJobPayload;
    }) => completeJob(jobId, payload),
    onSuccess: () => {
      // Invalidate both lists and details to ensure UI syncs everywhere
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
      queryClient.invalidateQueries({ queryKey: jobKeys.details() });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.details ?? "Something went wrong.";
        toast.error(message);
      } else {
        toast.error("Something went wrong.");
      }
    },
  });
};

export const useProviderJobs = () => {
  return useQuery({
    queryKey: jobKeys.providerFeed(),
    queryFn: getProviderJobsList,
  });
};
