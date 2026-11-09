import type {MetadataRoute} from 'next';
import {createClient} from '@supabase/supabase-js';
import getSiteControlSettings from '@/lib/siteControlSettings.server';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {seo} = await getSiteControlSettings();
  let siteOrigin: URL;

  try {
    siteOrigin = new URL(seo.canonicalUrl);
  } catch {
    console.error('Cannot generate sitemap: canonical URL is invalid.');
    return [];
  }

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteOrigin.toString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: new URL('/special-events', siteOrigin).toString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Cannot add product URLs to sitemap: public Supabase configuration is missing.');
    return entries;
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {persistSession: false, autoRefreshToken: false},
  });
  const {data, error} = await supabase.from('products').select('id');

  if (error) {
    console.error('Unable to add product URLs to sitemap:', error.message);
    return entries;
  }

  return entries.concat(
    (data || []).map(({id}) => ({
      url: new URL(`/product/${encodeURIComponent(id)}`, siteOrigin).toString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );
}
