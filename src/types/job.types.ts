import type { ComponentType } from "react";
import type { BidResponse } from "./bid.types";

export interface IJobCategoryCard {
  id: string;
  Icon: React.ElementType;
  title: string;
  selected: string | null;
  setSelected: (name: string) => void;
}

export interface IJobCategoryProps {
  Icon: React.ElementType;
  title: string;
}

export interface JobStep {
  title: string;
  description: string;
  component: ComponentType;
}

export interface IJobCardProps {
  description: string;
  jobType: string;
  bids: number;
  jobPosted: Date;
}

export interface CreateJobFormValues {
  category: string;
  urgency: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  images: File[];
}

export interface CreateJobPayload {
  category: string;
  urgency: string;
  description: string; // WHY: This must be here to satisfy the backend DTO
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  images: string[];
}

export type Urgency = "EMERGENCY" | "STANDARD" | "PLANNING_AHEAD";
export type JobStatus =
  | "ANALYZING"
  | "OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface JobResponse {
  id: string;
  description: string;
  categoryName: string;
  categoryIcon: string;
  urgency: "LOW" | "MEDIUM" | "HIGH" | "EMERGENCY" | string; // Update to match your Urgency enum
  status:
    | "OPEN"
    | "ANALYZING"
    | "IN_PROGRESS"
    | "AWAITING_CONFIRMATION"
    | "COMPLETED"
    | "CANCELLED"
    | "EXPIRED"
    | "FAILED";
  images: string[];
  createdAt: string;
  expiresAt: string;
  latitude: number;
  longitude: number;
  distance: number;
  address: string;
  customerName: string;
  customerImageUrl: string | null;
  bidCount: number;
  difficulty: "LOW" | "MEDIUM" | "HIGH";
  contactNumber: string | null;
  isUnlocked: boolean;
  myBid: BidResponse | null;
  rating: IRating | null;
}

export interface CompleteJobPayload {
  completionNotes?: string;
  completionImages?: string[];
}

export interface IProviderStats {
  totalEarned: number;
  thisMonthEarned: number;
  activeJobs: number;
  avgRating: number | null;
  ratingCount: number;
}

export interface IRating {
  id: string;
  jobId: string;
  providerId: string;
  customerId: string;
  customerName: string;
  score: number;
  review: string | null;
  createdAt: string;
}
