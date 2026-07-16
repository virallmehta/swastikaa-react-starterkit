import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { ENV } from '@constants/env';
import { ThemeToggle } from '@components/common/ThemeToggle';

/** Centered card layout for authentication flows. */
export function AuthLayout() {
  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      <div className="flex items-center justify-between p-4">
        <Link to={ROUTES.HOME} className="text-lg font-bold">
          {ENV.APP_NAME}
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="card-surface w-full max-w-md p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
