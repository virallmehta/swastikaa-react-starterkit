import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from '@constants/routes';

/**
 * Guards nested routes behind authentication. Redirects to /auth/login
 * and remembers the attempted path so we can bounce back after login.
 */
export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

/** Inverse guard — keeps logged-in users out of /auth/* pages. */
export function GuestRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
