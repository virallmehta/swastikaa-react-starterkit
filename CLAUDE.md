# CLAUDE.md

This file gives Claude Code (or any AI coding agent) context about this
project so it can make consistent, on-convention changes. It's entirely
optional — delete it if you don't use AI coding tools.

## Stack

- React 18 + Vite 6
- Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`) + DaisyUI
- React Router v6 (nested layouts + lazy-loaded pages)
- Zustand (with `persist` for auth/theme)
- React Hook Form + Zod for all forms
- Axios, with a preconfigured instance in `src/api/axios.js`
- react-hot-toast for notifications
- lucide-react for icons

## Conventions

- **Path aliases**: use `@/`, `@components`, `@hooks`, `@store`, `@services`,
  `@utils`, `@constants`, `@layouts`, `@pages`, `@routes`, `@api`, `@styles`
  instead of relative `../../` imports.
- **New page**: add the component under `src/pages/<area>/`, register its
  route + path constant in `src/constants/routes.js`, then lazy-import it in
  `src/routes/AppRoutes.jsx`.
- **New API call**: add it to the relevant file in `src/services/`, don't
  call `axios`/`api` directly from components.
- **New global state**: add a Zustand store in `src/store/`; keep stores
  small and feature-scoped (auth, theme, ui) rather than one giant store.
- **Forms**: define a Zod schema in `src/utils/validators.js`, then wire it
  up with `useForm({ resolver: zodResolver(schema) })`.
- **Styling**: prefer Tailwind utilities + DaisyUI component classes
  (`btn`, `card`, `input`, etc.) over custom CSS. Shared utility classes
  live in `@layer components` in `src/styles/index.css`.
- **Auth**: `useAuthStore` holds `user`/`isAuthenticated`; `useAuth()` hook
  wires it to `authService`. Protected pages go under the `ProtectedRoute`
  wrapper in `AppRoutes.jsx`; logged-out-only pages (login/register) go
  under `GuestRoute`.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` — Prettier (with Tailwind class sorting)

## Headless CMS integrations

- `src/services/wordpressService.js` — WP REST API + optional WPGraphQL
- `src/services/wagtailService.js` — Wagtail API v2
- Both are opt-in: set `VITE_WORDPRESS_API_URL` / `VITE_WAGTAIL_API_URL` in
  `.env` to enable. See `src/pages/public/Blog.jsx` for a usage example.
