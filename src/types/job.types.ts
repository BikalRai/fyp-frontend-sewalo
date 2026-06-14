import type { ComponentType } from "react";

export interface IJobCategoryCard {
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
  title: string;
  description: string;
  jobType: string;
  bids: number;
  jobPosted: Date;
}

export interface IJobCategoryCard {
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
  component: React.ComponentType;
}

export interface IJobCardProps {
  title: string;
  description: string;
  jobType: string;
  bids: number;
  jobPosted: Date;
}

// types/job.types.ts (or just at the top of the file)
export interface MockBid {
  id: string;
  providerId: string;
  providerName: string;
  rating: number;
  reviewCount: number;
  price: number;
  pricingBasis: "VISIT" | "FIXED";
  message: string;
  submittedAt: string;
}

export interface MockJobDetail {
  id: string;
  title: string;
  category: string;
  status: "PENDING" | "MATCHED" | "IN_PROGRESS" | "COMPLETED";
  description: string;
  urgency: string;
  location: string;
  postedAt: string;
  bids: MockBid[];
}

export const mockJobData: MockJobDetail = {
  id: "job-123",
  title: "Leaking pipe under kitchen sink",
  category: "Plumbing",
  status: "MATCHED",
  description:
    "The PVC pipe under my kitchen sink has a steady drip. It seems to be coming from the U-bend joint. Need someone to fix or replace the fitting.",
  urgency: "As soon as possible",
  location: "Baneshwor, Kathmandu",
  postedAt: "2 hours ago",
  bids: [
    {
      id: "bid-1",
      providerId: "pro-99",
      providerName: "Ramesh Sharma",
      rating: 4.8,
      reviewCount: 42,
      price: 500,
      pricingBasis: "VISIT",
      message:
        "Hi there! I'm based in Baneshwor and can drop by in 30 minutes to inspect and fix the U-bend. The 500 is my minimum visit fee, parts will be extra at cost.",
      submittedAt: "10 mins ago",
    },
    {
      id: "bid-2",
      providerId: "pro-45",
      providerName: "Kathmandu Quick Fix",
      rating: 4.5,
      reviewCount: 128,
      price: 1500,
      pricingBasis: "FIXED",
      message:
        "We specialize in kitchen plumbing. We will replace the entire U-bend system with new heavy-duty PVC. Price includes labor and standard parts.",
      submittedAt: "45 mins ago",
    },
  ],
};
