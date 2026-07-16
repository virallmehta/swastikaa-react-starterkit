/**
 * Centralized, validated access to environment variables.
 * Import from here instead of using `import.meta.env` directly across the app,
 * so there's a single place to see what env vars the app depends on.
 */
export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Swastikaa StarterKit App',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',

  SITE_URL: (import.meta.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, ''),
  SITE_DESCRIPTION:
    import.meta.env.VITE_SITE_DESCRIPTION ||
    'A production-ready React boilerplate for SaaS apps and websites.',
  DEFAULT_OG_IMAGE: import.meta.env.VITE_DEFAULT_OG_IMAGE || '/og-image.png',
  TWITTER_HANDLE: import.meta.env.VITE_TWITTER_HANDLE || '',
  ORGANIZATION_NAME:
    import.meta.env.VITE_ORGANIZATION_NAME || import.meta.env.VITE_APP_NAME || 'My App',

  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,

  WORDPRESS_API_URL: import.meta.env.VITE_WORDPRESS_API_URL || '',
  WORDPRESS_GRAPHQL_URL: import.meta.env.VITE_WORDPRESS_GRAPHQL_URL || '',

  WAGTAIL_API_URL: import.meta.env.VITE_WAGTAIL_API_URL || '',

  AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'app_access_token',
  AUTH_REFRESH_TOKEN_KEY: import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || 'app_refresh_token',

  ENABLE_DARK_MODE: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',

  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};
