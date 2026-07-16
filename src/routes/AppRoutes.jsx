import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { PageLoader } from '@components/ui/Spinner';
import { ROUTES } from '@constants/routes';

// Lazy-load every page so route-level code splitting happens automatically.
const Home = lazy(() => import('@pages/public/Home'));
const About = lazy(() => import('@pages/public/About'));

const NotFound = lazy(() => import('@pages/errors/NotFound'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public site */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
        </Route>

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  );
}
