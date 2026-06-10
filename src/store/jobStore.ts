import { create } from "zustand";

export interface JobPostState {
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
  reset: () => void;
}

export const useJobPostStore = create<JobPostState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (val) => set({ selectedCategory: val }),
  reset: () => set({ selectedCategory: null }),
}));

export interface UrgencyState {
  urgency: string | null;
  setUrgency: (val: string | null) => void;
  reset: () => void;
}

export const useUrgencyStore = create<UrgencyState>((set) => ({
  urgency: null,
  setUrgency: (val) =>
    set({
      urgency: val,
    }),
  reset: () => set({ urgency: null }),
}));

export interface ImageState {
  selectedImages: File[];
  addImages: (files: File[]) => void;
  removeImage: (index: number) => void;
  clearImages: () => void;
}

export const useImageStore = create<ImageState>((set) => ({
  selectedImages: [],
  addImages: (files) =>
    set((state) => ({
      selectedImages: [...state.selectedImages, ...files].slice(0, 3),
    })),
  removeImage: (index) =>
    set((state) => ({
      selectedImages: state.selectedImages.filter((_, i) => i !== index),
    })),
  clearImages: () =>
    set({
      selectedImages: [],
    }),
}));

export interface LocationState {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  phoneNumber: string;
  setLocation: (lat: number, lng: number, address?: string) => void;
  setAddress: (address: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  reset: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: {
    lat: 27.7172,
    lng: 85.324,
    address: "",
  },
  phoneNumber: "",
  setLocation: (lat, lng, address = "") =>
    set((state) => ({
      location: { ...state.location, lat, lng, address },
    })),
  setAddress: (address) =>
    set((state) => ({
      location: { ...state.location, address },
    })),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  reset: () =>
    set({
      location: { lat: 27.7172, lng: 85.324, address: "" },
      phoneNumber: "",
    }),
}));
