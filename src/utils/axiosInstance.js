import axios from "axios";
import { BASE_URL } from "./api";
import { API } from "./api";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - adds token to requests automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles token refresh on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentToken = localStorage.getItem("authToken");

      // If no token exists, reject immediately
      if (!currentToken) {
        isRefreshing = false;
        processQueue(new Error("No token available"), null);
        return Promise.reject(error);
      }

      try {
        // Try to refresh the token
        const response = await axios.post(
          API.refresh,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { token, user } = response.data;

        if (token) {
          // Update token in localStorage
          localStorage.setItem("authToken", token);

          // Update user in localStorage if provided
          if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
          }

          // Process queued requests
          processQueue(null, token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error("No token in refresh response");
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAdmin");

        // Only redirect if we're not already on the login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

