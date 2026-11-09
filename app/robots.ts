import type {MetadataRoute} from 'next';
import getSiteControlSettings from '@/lib/siteControlSettings.server';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const {seo} = await getSiteControlSettings();

  return {
    rules: {
      userAgent: '*',
      allow: seo.robotsIndex ? '/' : undefined,
      disallow: seo.robotsIndex ? undefined : '/',
    },
    sitemap: seo.sitemapUrl || undefined,
  };
}
