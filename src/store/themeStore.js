import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const applyThemeToDocument = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark' || theme === 'night');
};

/**
 * Theme store — drives DaisyUI's `data-theme` attribute and Tailwind's
 * `dark` class simultaneously, so both DaisyUI components and plain
 * Tailwind `dark:` utilities stay in sync.
 * Storage key matches the inline script in index.html (see there for the
 * flash-of-wrong-theme prevention).
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',

      setTheme: (theme) => {
        applyThemeToDocument(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        get().setTheme(next);
      },
    }),
    {
      name: 'app-theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyThemeToDocument(state.theme);
      },
    }
  )
);
