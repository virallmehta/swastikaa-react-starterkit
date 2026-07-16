import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useFetch } from '@hooks/useFetch';
import { wordpressService } from '@services/wordpressService';
import { PageLoader } from '@components/ui/Spinner';
import { Seo } from '@components/common/Seo';
import { ROUTES, buildRoute } from '@constants/routes';
import { ENV } from '@constants/env';
import { formatDate, stripHtml, truncate } from '@utils/formatters';
import { articleJsonLd, breadcrumbJsonLd } from '@utils/jsonLd';

export default function BlogPost() {
  const { slug } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useFetch(() => wordpressService.getPostBySlug(slug), [slug]);

  if (isLoading) return <PageLoader />;

  if (error || !post) {
    // If you add SSR/prerendering later, make this also return an HTTP 404 status.
    return <p className="text-base-content/70 text-center">Post not found.</p>;
  }

  const path = buildRoute(ROUTES.BLOG_POST, { slug: post.slug });
  const title = stripHtml(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt?.rendered || ''), 160);
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ENV.DEFAULT_OG_IMAGE;
  const absoluteImage = image?.startsWith('http') ? image : `${ENV.SITE_URL}${image}`;
  const authorName = post._embedded?.author?.[0]?.name;

  return (
    <article className="prose mx-auto max-w-2xl">
      <Seo
        title={title}
        description={description}
        image={image}
        type="article"
        path={path}
        publishedTime={post.date}
        modifiedTime={post.modified}
        jsonLd={[
          articleJsonLd({
            title,
            description,
            image: absoluteImage,
            url: `${ENV.SITE_URL}${path}`,
            publishedTime: post.date,
            modifiedTime: post.modified,
            authorName,
          }),
          breadcrumbJsonLd([
            { name: 'Blog', path: ROUTES.BLOG },
            { name: title, path },
          ]),
        ]}
      />
      <Link
        to={ROUTES.BLOG}
        className="text-primary mb-6 inline-flex items-center gap-1 text-sm no-underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className="text-base-content/60 text-sm">{formatDate(post.date)}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
