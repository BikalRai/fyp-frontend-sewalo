import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  // 1. Define the endpoints that should NEVER receive an Authorization header
  const isPublicRoute =
    config.url === "/auth/login" ||
    config.url === "/auth/register" ||
    config.url === "/auth/google" ||
    config.url?.startsWith("/oauth2/");

  // 2. Only attach the token if we have one AND it's not a public route
  if (token && !isPublicRoute) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error.config;

    const isAuthRoute =
      originalConfig.url === "/auth/register" ||
      originalConfig.url === "/auth/login";

    if (
      error.response?.status === 401 &&
      !originalConfig._retry &&
      !isAuthRoute
    ) {
      originalConfig._retry = true;

      try {
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

        const { setAuth, role, userId, isActive } = useAuthStore.getState();
        setAuth(
          data.data.access_token,
          role ?? data.data.role,
          userId ?? data.data.userId,
          isActive ?? data.data.isActive,
        );
        originalConfig.headers["Authorization"] =
          `Bearer ${data.data.access_token}`;

        return api(originalConfig);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { api };
