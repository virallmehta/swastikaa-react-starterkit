/** Central route path registry — avoid hardcoding path strings around the app. */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',

  NOT_FOUND: '/404',
};

export const buildRoute = (route, params = {}) =>
  Object.entries(params).reduce((path, [key, value]) => path.replace(`:${key}`, value), route);
