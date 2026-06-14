import { authKeys } from "@/lib/queryKeys";
import {
  googleAuth,
  googleAuthSetRole,
  loginUser,
  logoutUser,
  registerUser,
  resendVerificationCode,
  verifyAccount,
} from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(
        data.access_token,
        data.user.role,
        data.user.id,
        data.user.isActive,
        data.user.isOnboarded,
      );
      queryClient.setQueryData(authKeys.currentUser(), data);

      if (!data.user.isActive) {
        navigate("/auth/verify");
      } else if (!data.user.isOnboarded) {
        if (data.user.role === "PROVIDER") {
          navigate("/provider-onboarding");
        } else {
          navigate("/customer-onboarding");
        }
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(
        data.access_token,
        data.role,
        data.userId,
        data.isActive,
        data.isOnboarded,
      );
      queryClient.setQueryData(authKeys.currentUser(), data);

      if (!data.isActive) {
        navigate("/auth/verify");
      } else if (data.isActive && !data.isOnboarded) {
        if (data.role === "PROVIDER") {
          navigate("/provider-onboarding");
        } else {
          navigate("/customer-onboarding");
        }
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (idToken: string) => googleAuth(idToken),
    onSuccess: (data) => {
      setAuth(
        data.data.access_token,
        data.data.role,
        data.data.userId,
        data.data.isActive,
        data.data.isOnboarded,
      );
      queryClient.setQueryData(authKeys.currentUser(), data);

      if (data.data.role === "GUEST" && !data.data.isOnBoarded) {
        navigate("/auth/google/set-role");
      } else if (data.data.isOnBoarded) {
        navigate("/dashboard");
      } else {
        if (data.data.role === "PROVIDER") {
          navigate("/provider-onboarding");
        } else {
          navigate("/customer-onboarding");
        }
      }
    },
    onError: (error) => {
      console.error("Google OAuth failed: ", error);
    },
  });
};

export const useGoogleSetRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: googleAuthSetRole,
    onSuccess: (data) => {
      setAuth(
        data.access_token,
        data.role,
        data.userId,
        data.isActive,
        data.isOnBoarded,
      );
      queryClient.setQueryData(authKeys.currentUser(), data);

      if (data.role === "PROVIDER") {
        navigate("/provider-onboarding");
      } else {
        navigate("/customer-onboarding");
      }
    },
    onError: (error) => {
      console.error("Failed to set role: ", error);
    },
  });
};

export const useVerify = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { role } = useAuthStore();

  return useMutation({
    mutationFn: verifyAccount,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.currentUser(), data);
      if (role === "PROVIDER") {
        navigate("/provider-onboarding");
      } else {
        navigate("/customer-onboarding");
      }
    },
    onError: (error) => {
      console.error("Account verification error", error);
    },
  });
};

export const useResendCode = () => {
  return useMutation({
    mutationFn: resendVerificationCode,
    onError: (error) => {
      console.error("Failed to resend verification code", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      if (clearAuth) {
        clearAuth();
      } else {
        console.warn("Please add a clearAuth method to you useAuthStore!");
      }

      queryClient.clear();

      navigate("/auth/login");
    },
  });
};
