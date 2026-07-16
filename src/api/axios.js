import axios from 'axios';
import { ENV } from '@constants/env';
import { storage } from '@utils/storage';
import { useAuthStore } from '@store/authStore';

/**
 * Preconfigured Axios instance for your own backend API.
 * Handles: auth token attachment, request timeout, 401 refresh-and-retry,
 * and normalized error shape for the UI layer.
 */
export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ---- Request interceptor: attach bearer token ----------------------------
api.interceptors.request.use(
  (config) => {
    const token = storage.get(ENV.AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Response interceptor: refresh token on 401, normalize errors --------
let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Attempt a silent token refresh once per request on 401.
    if (status === 401 && !originalRequest._retry && ENV.AUTH_REFRESH_TOKEN_KEY) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = storage.get(ENV.AUTH_REFRESH_TOKEN_KEY);
        if (!refreshToken) throw error;

        const { data } = await axios.post(`${ENV.API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        storage.set(ENV.AUTH_TOKEN_KEY, data.accessToken);
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Normalize error shape so components can rely on `error.message`.
    const normalized = {
      status,
      message: error.response?.data?.message || error.message || 'Something went wrong',
      errors: error.response?.data?.errors || null,
      raw: error,
    };
    return Promise.reject(normalized);
  }
);
