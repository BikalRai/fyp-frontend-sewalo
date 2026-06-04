import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  userId: string | null;
  isActive: boolean | null;
  isOnboarded: boolean | null;
  setAuth: (
    accessToken: string,
    role: string,
    userId: string,
    isActive: boolean,
    isOnboarded?: boolean,
  ) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,
      userId: null,
      isActive: null,
      isOnboarded: null,
      setAuth: (accessToken, role, userId, isActive, isOnboarded) =>
        set({
          accessToken,
          role,
          userId,
          isActive,
          isOnboarded,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          role: null,
          userId: null,
          isActive: null,
          isOnboarded: null,
        }),
    }),
    {
      name: "sewalo-auth-storage",
    },
  ),
);
