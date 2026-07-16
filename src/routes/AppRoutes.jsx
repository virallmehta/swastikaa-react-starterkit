import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { AuthLayout } from '@layouts/AuthLayout';
import { DashboardLayout } from '@layouts/DashboardLayout';
import { ProtectedRoute, GuestRoute } from '@routes/ProtectedRoute';
import { PageLoader } from '@components/ui/Spinner';
import { ROUTES } from '@constants/routes';

// Lazy-load every page so route-level code splitting happens automatically.
const Home = lazy(() => import('@pages/public/Home'));
const About = lazy(() => import('@pages/public/About'));
const Blog = lazy(() => import('@pages/public/Blog'));
const BlogPost = lazy(() => import('@pages/public/BlogPost'));
const Contact = lazy(() => import('@pages/public/Contact'));

const Login = lazy(() => import('@pages/auth/Login'));
const Register = lazy(() => import('@pages/auth/Register'));
const ForgotPassword = lazy(() => import('@pages/auth/ForgotPassword'));

const Overview = lazy(() => import('@pages/dashboard/Overview'));
const Profile = lazy(() => import('@pages/dashboard/Profile'));
const Settings = lazy(() => import('@pages/dashboard/Settings'));

const NotFound = lazy(() => import('@pages/errors/NotFound'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public site */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={ROUTES.BLOG_POST} element={<BlogPost />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
        </Route>

        {/* Auth flows — redirect away if already logged in */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>
        </Route>

        {/* Authenticated app */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<Overview />} />
            <Route path={ROUTES.DASHBOARD_PROFILE} element={<Profile />} />
            <Route path={ROUTES.DASHBOARD_SETTINGS} element={<Settings />} />
          </Route>
        </Route>

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  );
}