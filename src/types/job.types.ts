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
