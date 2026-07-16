import { Link } from 'react-router-dom';
import { useFetch } from '@hooks/useFetch';
import { wordpressService } from '@services/wordpressService';
import { PageLoader } from '@components/ui/Spinner';
import { Card } from '@components/ui/Card';
import { Seo } from '@components/common/Seo';
import { ROUTES, buildRoute } from '@constants/routes';
import { formatDate, stripHtml, truncate } from '@utils/formatters';

/**
 * Example headless WordPress blog listing.
 * Point VITE_WORDPRESS_API_URL at your WP site's REST API in `.env`.
 */
export default function Blog() {
  const { data, error, isLoading } = useFetch(() => wordpressService.getPosts({ perPage: 9 }), []);

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="text-base-content/70 text-center">
        <p>Could not load posts. Configure VITE_WORDPRESS_API_URL in your .env file.</p>
      </div>
    );
  }

  return (
    <div>
      <Seo title="Blog" description="Latest articles and updates." path={ROUTES.BLOG} />
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.posts?.map((post) => (
          <Link key={post.id} to={buildRoute(ROUTES.BLOG_POST, { slug: post.slug })}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2
                className="font-semibold"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="text-base-content/60 mt-1 text-xs">{formatDate(post.date)}</p>
              <p className="text-base-content/70 mt-3 text-sm">
                {truncate(stripHtml(post.excerpt?.rendered || ''), 140)}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
