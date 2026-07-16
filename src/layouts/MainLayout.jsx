import { Outlet } from 'react-router-dom';
import { Footer } from '@components/common/Footer';
import { Navbar } from '@components/common/Navbar';

/** Layout for public-facing pages: home, about, blog, contact, etc. */
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container-app flex-1 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
