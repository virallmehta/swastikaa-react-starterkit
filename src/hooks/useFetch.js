import { useEffect, useState, useCallback } from 'react';

/**
 * Minimal data-fetching hook. For anything non-trivial (caching, retries,
 * pagination), swap this out for TanStack Query — this keeps the
 * boilerplate dependency-light while still following good patterns.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const run = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    let active = true;
    (async () => {
      if (active) await run();
    })();
    return () => {
      active = false;
    };
  }, [run]);

  return { data, error, isLoading, refetch: run };
}
