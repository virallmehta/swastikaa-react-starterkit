import axios from 'axios';
import { ENV } from '@constants/env';

/**
 * Headless WordPress client (WP REST API v2).
 * Docs: https://developer.wordpress.org/rest-api/
 */
export const wpApi = axios.create({
  baseURL: ENV.WORDPRESS_API_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { Accept: 'application/json' },
});

/**
 * Headless WordPress GraphQL client (requires the WPGraphQL plugin).
 */
export const wpGraphQL = axios.create({
  baseURL: ENV.WORDPRESS_GRAPHQL_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

export const wpGraphQLQuery = async (query, variables = {}) => {
  const { data } = await wpGraphQL.post('', { query, variables });
  if (data.errors?.length) throw new Error(data.errors[0].message);
  return data.data;
};

/**
 * Headless Wagtail client (Wagtail API v2).
 * Docs: https://docs.wagtail.org/en/stable/advanced_topics/api/v2/usage.html
 */
export const wagtailApi = axios.create({
  baseURL: ENV.WAGTAIL_API_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { Accept: 'application/json' },
});
