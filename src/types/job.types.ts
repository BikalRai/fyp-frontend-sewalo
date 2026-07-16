import type { ComponentType } from "react";

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
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | string; // Update to match JobStatus enum
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
}
