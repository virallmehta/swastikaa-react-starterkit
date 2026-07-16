/**
 * Thin wrapper around localStorage that fails silently in environments
 * where storage is unavailable (SSR, private browsing, etc).
 */
export const storage = {
  get(key, fallback = null) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* no-op */
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* no-op */
    }
  },
};
