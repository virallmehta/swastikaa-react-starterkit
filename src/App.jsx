import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from '@routes/AppRoutes';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            className: 'text-sm',
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
