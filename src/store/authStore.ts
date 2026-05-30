import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  role: string | null;
  userId: string | null;
  isActive: boolean | null;
  isOnBoarded: boolean | null;
  setAuth: (
    accessToken: string,
    role: string,
    userId: string,
    isActive: boolean,
    isOnBoarded?: boolean,
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
      isOnBoarded: null,
      setAuth: (accessToken, role, userId, isActive, isOnBoarded) =>
        set({
          accessToken,
          role,
          userId,
          isActive,
          isOnBoarded,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          role: null,
          userId: null,
          isActive: null,
          isOnBoarded: null,
        }),
    }),
    {
      name: "sewalo-auth-storage",
    },
  ),
);
