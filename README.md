# Swastika React StarterKit

A production-ready React + Vite starter for SaaS apps, marketing websites, and
headless CMS front-ends (WordPress / Wagtail). Batteries included: routing,
auth scaffolding, theming, forms, and a small reusable component library.

## Stack

| Concern             | Choice                                  |
| ------------------- | --------------------------------------- |
| Build tool          | Vite 6                                  |
| UI                  | React 18                                |
| Styling             | Tailwind CSS v4 + DaisyUI               |
| Routing             | React Router v6                         |
| Server/client state | Axios + a minimal `useFetch` hook       |
| Global state        | Zustand (persisted auth & theme stores) |
| Forms & validation  | React Hook Form + Zod                   |
| Notifications       | react-hot-toast                         |
| Icons               | lucide-react                            |
| Linting/formatting  | ESLint (flat config) + Prettier         |

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173.

## Scripts

```bash
npm run dev           # start dev server
npm run seo:generate  # regenerate public/sitemap.xml + robots.txt on demand
npm run build         # production build to dist/ (runs seo:generate first)
npm run preview       # preview the production build locally
npm run lint          # run ESLint
npm run lint:fix      # run ESLint and auto-fix
npm run format        # run Prettier (sorts Tailwind classes too)
npm run format:check  # check formatting without writing
```

## Folder structure

```
scripts/
└── generate-seo-files.mjs   # writes public/sitemap.xml + robots.txt (runs via `prebuild`)

src/
├── api/              # axios instances (main API, WordPress, Wagtail)
├── assets/           # images, icons, static files
├── components/
│   ├── ui/           # generic, style-only building blocks (Button, Input, Card, Spinner)
│   ├── common/       # app-aware shared components (Navbar, Footer, Sidebar, ThemeToggle, ErrorBoundary, Seo)
│   └── forms/        # (empty by default) — put multi-field composite forms here as your app grows
├── constants/        # env access, route paths, nav links, theme list
├── hooks/            # useAuth, useTheme, useDebounce, useFetch
├── layouts/          # MainLayout, AuthLayout, DashboardLayout
├── pages/
│   ├── public/       # Home, About, Blog, BlogPost, Contact
│   ├── auth/         # Login, Register, ForgotPassword
│   ├── dashboard/    # Overview, Profile, Settings (protected)
│   └── errors/       # NotFound
├── routes/           # AppRoutes.jsx, ProtectedRoute.jsx (+ GuestRoute)
├── services/         # authService, userService, wordpressService, wagtailService
├── store/            # authStore, themeStore, uiStore (Zustand)
├── styles/           # Tailwind v4 entry point (index.css)
├── utils/            # cn, storage, formatters, validators (Zod schemas)
├── App.jsx
└── main.jsx
```

## Path aliases

Configured in both `vite.config.js` and `jsconfig.json` (for editor
IntelliSense):

```
@/components/ui/Button   →  src/components/ui/Button
@api, @assets, @components, @constants, @hooks, @layouts,
@pages, @routes, @services, @store, @styles, @utils
```

## Environment variables

Copy `.env.example` to `.env` and fill in what you need. All variables are
centralized and validated in `src/constants/env.js` — import `ENV` from
there rather than reading `import.meta.env` directly:

```js
import { ENV } from '@constants/env';
ENV.API_BASE_URL;
```

Key variables:

- `VITE_API_BASE_URL` — your own backend API
- `VITE_WORDPRESS_API_URL` / `VITE_WORDPRESS_GRAPHQL_URL` — headless WordPress
- `VITE_WAGTAIL_API_URL` — headless Wagtail
- `VITE_AUTH_TOKEN_KEY` / `VITE_AUTH_REFRESH_TOKEN_KEY` — localStorage keys used for tokens

## Authentication

- `src/store/authStore.js` — Zustand store (persisted), holds `user` /
  `isAuthenticated`, exposes `login`, `register`, `logout`.
- `src/hooks/useAuth.js` — wires the store to `authService` and shows
  toasts on success/failure. Use this in components, not the raw store.
- `src/services/authService.js` — the actual HTTP calls. Point these at
  your backend's auth endpoints.
- `src/api/axios.js` — attaches the bearer token to every request and
  automatically attempts a silent refresh on `401`, queuing concurrent
  requests while the refresh is in flight.
- `src/routes/ProtectedRoute.jsx` — wrap authenticated routes in
  `<ProtectedRoute />`; wrap logged-out-only routes (login/register) in
  `<GuestRoute />`. Both are already used in `AppRoutes.jsx`.

This is intentionally backend-agnostic — swap in Firebase Auth, Auth0,
Clerk, or a custom Node/Django/Laravel API by editing `authService.js` and
`axios.js` only; everything else (store, hook, guards, pages) stays the same.

## Theming (dark/light)

- `src/store/themeStore.js` sets `data-theme` (DaisyUI) and the `dark`
  class (plain Tailwind `dark:` utilities) together, so both systems work.
- `index.html` has an inline script that reads the persisted theme (or the
  OS preference) before React mounts, to avoid a flash of the wrong theme.
- Available themes are listed in `src/constants/app.js` and configured in
  the `@plugin "daisyui"` block in `src/styles/index.css`. Add/remove
  DaisyUI themes there.
- `src/components/common/ThemeToggle.jsx` is a ready-made light/dark toggle
  button already wired into the navbar.

## Forms

Every form uses the same pattern: a Zod schema in `src/utils/validators.js`
plus `useForm({ resolver: zodResolver(schema) })`. See `Login.jsx`,
`Register.jsx`, and `Contact.jsx` for examples, and `Input.jsx` for a
forward-ref input designed to be spread directly with `{...register('field')}`.

## SEO

Every public page renders a `<Seo />` component (`src/components/common/Seo.jsx`,
built on `react-helmet-async`) that sets:

- `<title>` and meta description
- Canonical URL
- Open Graph tags (Facebook, LinkedIn, Slack, WhatsApp)
- Twitter Card tags
- Optional JSON-LD structured data (Organization, WebSite, BlogPosting/Article, BreadcrumbList — helpers in `src/utils/jsonLd.js`)

```jsx
<Seo
  title="Blog"
  description="Latest articles and updates."
  path="/blog"
  image="/og-image.png"       // optional, defaults to VITE_DEFAULT_OG_IMAGE
  type="article"                // "website" | "article" | "profile"
  jsonLd={articleJsonLd({ ... })}
/>
```

Auth pages (login/register/forgot-password) and the dashboard are marked
`noIndex` since they shouldn't show up in search results — pass `noIndex`
to `<Seo />` on any page you want excluded the same way.

Site-wide defaults (site name, description, canonical domain, default
share image, Twitter handle, organization name) live in `.env` — see
the "SEO / Social sharing" block in `.env.example`.

### Sitemap.xml and robots.txt

`npm run build` automatically runs `npm run seo:generate`
(`scripts/generate-seo-files.mjs`) first, which writes
`public/sitemap.xml` and `public/robots.txt` (Vite then copies both into
`dist/` as static files). The script:

- Lists the static public routes (home, about, blog, contact) — keep this
  in sync with `src/constants/routes.js` if you add public pages.
- If `VITE_WORDPRESS_API_URL` is set, fetches every published post and adds
  it as a `<url>` entry automatically, so new blog posts show up in the
  sitemap on the next deploy with no manual step.
- Points `robots.txt` at the sitemap and disallows `/auth/` and `/dashboard`.
- Fails gracefully: if the CMS is unreachable at build time, you still get
  a valid sitemap with the static routes and a warning in the build log.

Run it on its own any time with `npm run seo:generate`. Extend the script
the same way for Wagtail pages or other dynamic content.

### Social preview cards — the one thing to know

This Swastikaa React StarterKit is a **client-rendered SPA**. That matters for SEO in one
specific way:

- **Google is fine.** Googlebot executes JavaScript, so it sees the tags
  `react-helmet-async` injects on every route, plus the sitemap.
- **Facebook/X/LinkedIn/Slack/WhatsApp link previews are not guaranteed
  per-page.** Their crawlers generally don't run JavaScript, so they may
  only ever see the static tags baked into `index.html` (the homepage's
  title/description/image, via Vite's `%VITE_VAR%` build-time
  interpolation) — not the per-page ones React sets after mount. In
  practice this means a shared link to `/blog/my-post` on Facebook may show
  your homepage's title/image instead of the post's.

If rich, accurate previews for every page on every platform matter for
your project (typically true for content/marketing sites, less so for
logged-in SaaS dashboards), you have three options, roughly in order of
effort:

1. **Prerendering** — generate static HTML snapshots of public routes at
   build time (e.g. `vite-plugin-ssg`, `prerender.io`, or a Puppeteer-based
   script) so crawlers get fully-formed HTML without running JS.
2. **Edge-function bot detection** — on Vercel/Netlify/Cloudflare, detect
   known crawler user agents and serve them a pre-rendered response with
   the correct meta tags, while regular users still get the SPA.
3. **Move to an SSR/SSG framework** for the public-facing pages (Next.js,
   Astro, Remix) — the `wordpressService`/`wagtailService` data-fetching
   patterns here transfer directly; only the rendering layer changes.

None of this is set up out of the box (it adds real build complexity), but
the app is structured so any of the three can be layered in later without
touching the data layer.

## Headless CMS (WordPress & Wagtail)

Two ready-made service layers:

- **WordPress** (`src/services/wordpressService.js`): REST API by default
  (`getPosts`, `getPostBySlug`, `getPages`, `getCategories`), plus an
  optional GraphQL variant (`wordpressGraphQLService`) if you have the
  WPGraphQL plugin installed — generally the better choice for headless
  builds since you control the exact shape of the response.
- **Wagtail** (`src/services/wagtailService.js`): wraps Wagtail's built-in
  API v2 (`getPages`, `getPageById`, `getPageBySlug`, image renditions).

See `src/pages/public/Blog.jsx` and `BlogPost.jsx` for a working example
against the WordPress REST API.

### SSR / SEO note

This Swastikaa React StarterKit is a client-rendered SPA (good for dashboards/SaaS apps).
If you're building an SEO-critical marketing site or blog on top of
headless WordPress/Wagtail, consider a meta-framework with SSR/SSG
(Next.js, Astro, Remix) instead — the data-fetching patterns in
`wordpressService`/`wagtailService` transfer directly, only the rendering
layer changes.

## Reusable pieces

- **Components**: `Button`, `Input`, `Card`, `Spinner`/`PageLoader` in
  `components/ui`; `Navbar`, `Footer`, `Sidebar`, `ThemeToggle`,
  `ErrorBoundary`, `Seo` in `components/common`.
- **Layouts**: `MainLayout` (public site), `AuthLayout` (centered auth
  card), `DashboardLayout` (sidebar + navbar for the authenticated app).
- **Utils**: `cn()` for merging Tailwind classes, `storage` for safe
  localStorage access, `formatters` (dates, currency, truncation, HTML
  stripping), `validators` (Zod schemas), `jsonLd` (Organization, WebSite,
  BlogPosting/Article, BreadcrumbList structured-data builders).

## Git

This project ships a sensible `.gitignore` (node_modules, dist, .env, etc.).
To initialize:

```bash
git init
git add .
git commit -m "chore: initial commit from Swastikaa React StarterKit"
```

## Optional: AI coding assistants

`CLAUDE.md` documents the project's conventions (path aliases, where new
pages/services/stores go, styling rules) so Claude Code or another AI
coding agent can make on-convention changes without re-deriving them each
session. It's plain markdown with no runtime effect — safe to delete or
edit freely.

## Deployment

`npm run build` outputs a static `dist/` folder — deploy it to Vercel,
Netlify, Cloudflare Pages, S3+CloudFront, or any static host. Since this is
a client-side SPA, configure your host to rewrite all routes to
`index.html` (React Router handles the rest).
