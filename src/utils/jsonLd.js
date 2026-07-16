import { ENV } from '@constants/env';

/** Site-wide Organization schema — include once, e.g. in the root layout or homepage. */
export function organizationJsonLd({ logo = `${ENV.SITE_URL}/favicon.svg`, sameAs = [] } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ENV.ORGANIZATION_NAME,
    url: ENV.SITE_URL,
    logo,
    sameAs,
  };
}

/** WebSite schema with a SearchAction — enables Google's sitelinks search box. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ENV.APP_NAME,
    url: ENV.SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${ENV.SITE_URL}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/** BlogPosting schema for a single blog/article page. */
export function articleJsonLd({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  authorName,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image ? [image] : undefined,
    url,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: authorName ? { '@type': 'Person', name: authorName } : undefined,
    publisher: { '@type': 'Organization', name: ENV.ORGANIZATION_NAME },
  };
}

/** BreadcrumbList schema — pass an ordered array of { name, path }. */
export function breadcrumbJsonLd(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${ENV.SITE_URL}${item.path}`,
    })),
  };
}
