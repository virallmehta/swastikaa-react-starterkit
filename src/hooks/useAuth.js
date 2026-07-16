import { useCallback } from 'react';
import { useAuthStore } from '@store/authStore';
import { authService } from '@services/authService';
import toast from 'react-hot-toast';

/**
 * Convenience hook that wires the auth store to the authService,
 * so components just call `login(values)` without wiring dependencies.
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading, login, register, logout, setUser } = useAuthStore();

  const handleLogin = useCallback(
    async (credentials) => {
      const loggedInUser = await login(credentials, authService);
      toast.success(`Welcome back, ${loggedInUser?.name || 'there'}!`);
      return loggedInUser;
    },
    [login]
  );

  const handleRegister = useCallback(
    async (payload) => {
      const newUser = await register(payload, authService);
      toast.success('Account created successfully!');
      return newUser;
    },
    [register]
  );

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      /* ignore network errors on logout */
    } finally {
      logout();
      toast.success('Logged out');
    }
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
