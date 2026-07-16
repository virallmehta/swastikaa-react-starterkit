import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, User, X } from 'lucide-react';
import { ROUTES } from '@constants/routes';
import { useUiStore } from '@store/uiStore';
import { cn } from '@utils/cn';

const LINKS = [
  { label: 'Overview', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Profile', href: ROUTES.DASHBOARD_PROFILE, icon: User },
  { label: 'Settings', href: ROUTES.DASHBOARD_SETTINGS, icon: Settings },
];

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useUiStore();

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'bg-base-100 border-base-300/60 fixed inset-y-0 left-0 z-50 w-64 border-r p-4 transition-transform lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="font-semibold">Menu</span>
          <button
            onClick={closeSidebar}
            aria-label="Close menu"
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="menu w-full gap-1">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <NavLink
                to={href}
                end
                className={({ isActive }) => cn(isActive && 'active')}
                onClick={closeSidebar}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
