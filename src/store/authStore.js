import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ENV } from '@constants/env';
import { storage } from '@utils/storage';

/**
 * Auth store — holds the current user + tokens and exposes auth actions.
 * Persisted to localStorage so a refresh doesn't log the user out.
 * Swap the `login`/`register` bodies for real calls to `authService`.
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),

      setTokens: ({ accessToken, refreshToken }) => {
        if (accessToken) storage.set(ENV.AUTH_TOKEN_KEY, accessToken);
        if (refreshToken) storage.set(ENV.AUTH_REFRESH_TOKEN_KEY, refreshToken);
      },

      login: async (credentials, authService) => {
        set({ isLoading: true });
        try {
          const { user, accessToken, refreshToken } = await authService.login(credentials);
          get().setTokens({ accessToken, refreshToken });
          set({ user, isAuthenticated: true, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (payload, authService) => {
        set({ isLoading: true });
        try {
          const { user, accessToken, refreshToken } = await authService.register(payload);
          get().setTokens({ accessToken, refreshToken });
          set({ user, isAuthenticated: true, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        storage.remove(ENV.AUTH_TOKEN_KEY);
        storage.remove(ENV.AUTH_REFRESH_TOKEN_KEY);
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'app-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
