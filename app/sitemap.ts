import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = ['', '/about', '/publications', '/projects', '/teaching', '/teaching/cpd', '/cv', '/contact', '/privacy'];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
