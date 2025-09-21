export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages
  const staticRoutes = [
    '',
    '/about',
    '/categories',
    '/contact',
    '/team',
    '/privacy-policy',
    '/terms-of-service',
    '/dmca',
    '/error-page',
  ];

  // TODO: Fetch dynamic routes (news, categories) from backend when ready
  // Example:
  // const posts = await fetch(`${baseUrl}/api/posts`).then(res => res.json());
  // const postRoutes = posts.map((post) => `/news/${post.slug}`);

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.7,
  }));
}
