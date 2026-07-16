import { wagtailApi } from '@api/cms';

/**
 * Headless Wagtail service using Wagtail's built-in API v2.
 * Assumes standard `pages`, `images`, and `documents` endpoints are exposed
 * via `wagtail.api.v2.views` in the Wagtail backend.
 */
export const wagtailService = {
  getPages: async ({ type, fields = 'title,slug,body', limit = 20, offset = 0 } = {}) => {
    const { data } = await wagtailApi.get('/pages/', {
      params: { type, fields, limit, offset },
    });
    return data; // { meta: { total_count }, items: [...] }
  },

  getPageById: async (id, fields = '*') => {
    const { data } = await wagtailApi.get(`/pages/${id}/`, { params: { fields } });
    return data;
  },

  getPageBySlug: async (slug, fields = '*') => {
    const { data } = await wagtailApi.get('/pages/', { params: { slug, fields } });
    return data.items?.[0] || null;
  },

  getImageRenditionUrl: (imageId, spec = 'width-800') =>
    `${wagtailApi.defaults.baseURL}/images/${imageId}/${spec}/`,
};
