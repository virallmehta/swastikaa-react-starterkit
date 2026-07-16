import { wpApi, wpGraphQLQuery } from '@api/cms';

/**
 * Headless WordPress service using the REST API.
 * Use this when your WP site doesn't have WPGraphQL installed.
 */
export const wordpressService = {
  getPosts: async ({ page = 1, perPage = 10, search = '' } = {}) => {
    const { data, headers } = await wpApi.get('/posts', {
      params: { page, per_page: perPage, search, _embed: true },
    });
    return {
      posts: data,
      totalPages: Number(headers['x-wp-totalpages']) || 1,
      total: Number(headers['x-wp-total']) || data.length,
    };
  },

  getPostBySlug: async (slug) => {
    const { data } = await wpApi.get('/posts', { params: { slug, _embed: true } });
    return data[0] || null;
  },

  getPages: async () => {
    const { data } = await wpApi.get('/pages', { params: { _embed: true } });
    return data;
  },

  getCategories: async () => {
    const { data } = await wpApi.get('/categories');
    return data;
  },
};

/**
 * Same idea, but via GraphQL (requires the WPGraphQL plugin) — generally
 * preferred for headless builds since you can shape the exact response.
 */
export const wordpressGraphQLService = {
  getPosts: async (first = 10) => {
    const query = `
      query GetPosts($first: Int!) {
        posts(first: $first) {
          nodes {
            id
            title
            slug
            excerpt
            date
            featuredImage { node { sourceUrl altText } }
          }
        }
      }
    `;
    const data = await wpGraphQLQuery(query, { first });
    return data.posts.nodes;
  },

  getPostBySlug: async (slug) => {
    const query = `
      query GetPost($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          content
          date
          featuredImage { node { sourceUrl altText } }
        }
      }
    `;
    const data = await wpGraphQLQuery(query, { slug });
    return data.post;
  },
};
