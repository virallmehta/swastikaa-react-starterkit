import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '@constants/app';
import { ROUTES } from '@constants/routes';
import { ENV } from '@constants/env';

export function Navbar() {

  return (
    <header className="border-base-300/60 bg-base-100/80 sticky top-0 z-40 border-b backdrop-blur">
      <nav className="container-app navbar px-0">
        <div className="flex-1">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to={ROUTES.HOME} className="btn btn-ghost text-lg font-bold">
            {ENV.APP_NAME}
          </Link>
        </div>

        <div className="hidden flex-none lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) => (isActive ? 'font-semibold' : '')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
