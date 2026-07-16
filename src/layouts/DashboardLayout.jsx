import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Navbar } from '@components/common/Navbar';
import { Sidebar } from '@components/common/Sidebar';
import { useUiStore } from '@store/uiStore';

/** Layout for authenticated app screens: sidebar + top navbar. */
export function DashboardLayout() {
  const { toggleSidebar } = useUiStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container-app flex flex-1 gap-6">
        <Sidebar />
        <div className="min-w-0 flex-1 py-6">
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-sm mb-4 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" /> Menu
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
