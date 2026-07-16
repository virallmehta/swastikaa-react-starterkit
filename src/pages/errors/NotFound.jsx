import { Link } from 'react-router-dom';
import { Seo } from '@components/common/Seo';
import { ROUTES } from '@constants/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Seo title="Page not found" noIndex />
      <p className="text-primary text-6xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="text-base-content/60 mt-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to={ROUTES.HOME} className="btn btn-primary mt-6">
        Go home
      </Link>
    </div>
  );
}
