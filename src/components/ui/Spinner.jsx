import { cn } from '@utils/cn';

export function Spinner({ size = 'md', className }) {
  const sizes = { sm: 'loading-sm', md: 'loading-md', lg: 'loading-lg' };
  return <span className={cn('loading loading-spinner', sizes[size], className)} />;
}

/** Full-page loading state — used by Suspense fallbacks and route transitions. */
export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
