import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  userId: string | null;
  isActive: boolean | null;
  isOnboarded: boolean | null;
  hasHydrated: boolean;
  setAuth: (
    accessToken: string,
    role: string,
    userId: string,
    isActive: boolean,
    isOnboarded?: boolean,
  ) => void;
  updateAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,
      userId: null,
      isActive: null,
      isOnboarded: null,
      hasHydrated: false,
      setAuth: (accessToken, role, userId, isActive, isOnboarded) =>
        set({
          accessToken,
          role,
          userId,
          isActive,
          isOnboarded,
        }),
      updateAccessToken: (accessToken) => set({ accessToken }),
      clearAuth: () =>
        set({
          accessToken: null,
          role: null,
          userId: null,
          isActive: null,
          isOnboarded: null,
        }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "sewalo-auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
