/** Central route path registry — avoid hardcoding path strings around the app. */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  CONTACT: '/contact',

  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  DASHBOARD: '/dashboard',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  DASHBOARD_PROFILE: '/dashboard/profile',

  NOT_FOUND: '/404',
};

export const buildRoute = (route, params = {}) =>
  Object.entries(params).reduce((path, [key, value]) => path.replace(`:${key}`, value), route);
