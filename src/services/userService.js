import { api } from '@api/axios';

/** Example CRUD service — copy this pattern for any resource. */
export const userService = {
  getProfile: async () => {
    const { data } = await api.get('/users/me');
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await api.patch('/users/me', payload);
    return data;
  },

  list: async (params = {}) => {
    const { data } = await api.get('/users', { params });
    return data;
  },
};
