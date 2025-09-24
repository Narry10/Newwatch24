// app/sitemap.js
import { firestore } from '@/configs/firebaseAdmin';

export const revalidate = 30000;

async function getPostSlugs() {
  try {
    const db = firestore();
    const snapshot = await db
      .collection('posts')
      .where('status', '==', 'published')
      .select('slug', 'updatedAt', 'publishAt')
      .limit(1000)
      .get();
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        slug: data.slug,
        lastmod: data.updatedAt?.toDate?.()?.toISOString() || 
                data.publishAt?.toDate?.()?.toISOString() ||
                new Date().toISOString()
      };
    });
  } catch (error) {
    console.error('Error fetching slugs for sitemap:', error);
    return [];
  }
}

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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.7,
  }));

  // Fetch dynamic slugs directly from Firestore
  const slugs = await getPostSlugs();
  const postRoutes = slugs.map((item) => ({
    url: `${baseUrl}/news/${encodeURIComponent(item.slug)}`,
    lastModified: item.lastmod,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}