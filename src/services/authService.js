import { api } from '@api/axios';

/**
 * Auth service — one place for every auth-related API call.
 * Adjust endpoint paths to match your backend.
 */
export const authService = {
  login: async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data; // expected: { user, accessToken, refreshToken }
  },

  register: async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  me: async () => {
    const { data } = await api.get('/auth/me');
    return data.user;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async ({ token, password }) => {
    const { data } = await api.post('/auth/reset-password', { token, password });
    return data;
  },
};
