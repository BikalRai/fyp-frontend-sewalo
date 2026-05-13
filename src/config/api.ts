import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessKey");

  if (token) config.headers["Authorization"] = `Bearer ${token}`;

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

        localStorage.setItem("accessKey", data.accessToken);
        originalConfig.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return api(originalConfig);
      } catch (refreshError) {
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { api };
