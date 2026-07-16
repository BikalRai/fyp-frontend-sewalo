import { jobKeys } from "@/lib/queryKeys";
import {
  cancelJobPost,
  getCustomerJobById,
  getCustomerJobs,
  getJobLead,
  getProviderJobLeads,
  postJob,
} from "@/services/job.service";
import { uploadImagesToCloudinary } from "@/services/upload.service";
import type { CreateJobFormValues, CreateJobPayload } from "@/types/job.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
