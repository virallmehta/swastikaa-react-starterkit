import { Helmet } from 'react-helmet-async';
import { ENV } from '@constants/env';

/**
 * Drop-in SEO component — put one at the top of every page.
 * Handles: <title>, meta description, canonical URL, Open Graph (Facebook,
 * LinkedIn, WhatsApp), Twitter Card, and optional JSON-LD structured data.
 *
 * IMPORTANT — read this if social preview cards matter to you:
 * This app is a client-rendered SPA. Search engines like Google execute
 * JavaScript and will see these tags fine. Facebook/X/LinkedIn/Slack link
 * unfurlers generally do NOT execute JavaScript, so they may only ever see
 * the static tags baked into `index.html`, not the ones this component
 * injects at runtime. See the README "Social preview cards" section for
 * how to fix this (prerendering, an edge function, or SSR) if you need
 * rich-looking shares on socials for every page, not just the homepage.
 *
 * @param {string} title - Page title (site name is appended automatically)
 * @param {string} [description] - Meta description; falls back to the site default
 * @param {string} [image] - Absolute or root-relative OG/Twitter image URL
 * @param {'website'|'article'|'profile'} [type] - Open Graph type
 * @param {string} [path] - Route path (e.g. "/blog/my-post") used to build the canonical URL
 * @param {boolean} [noIndex] - Set true to add a `noindex, nofollow` robots tag
 * @param {object} [jsonLd] - A JSON-LD object (or array of objects) to embed as structured data
 * @param {string} [publishedTime] - ISO date, for `article:published_time` (blog posts)
 * @param {string} [modifiedTime] - ISO date, for `article:modified_time`
 */
export function Seo({
  title,
  description = ENV.SITE_DESCRIPTION,
  image = ENV.DEFAULT_OG_IMAGE,
  type = 'website',
  path = '',
  noIndex = false,
  jsonLd = null,
  publishedTime,
  modifiedTime,
}) {
  const fullTitle = title ? `${title} | ${ENV.APP_NAME}` : ENV.APP_NAME;
  const canonicalUrl = `${ENV.SITE_URL}${path}`;
  const absoluteImage = image?.startsWith('http') ? image : `${ENV.SITE_URL}${image}`;
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph — Facebook, LinkedIn, WhatsApp, Slack, etc. */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={ENV.APP_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImage} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      {ENV.TWITTER_HANDLE && <meta name="twitter:site" content={ENV.TWITTER_HANDLE} />}

      {/* JSON-LD structured data (Organization, Article, BreadcrumbList, etc.) */}
      {jsonLdList.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
