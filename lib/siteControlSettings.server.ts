import 'server-only';

import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  DEFAULT_SEO_SETTINGS,
  normalizeAccessibilitySettings,
  normalizeSEOSettings,
} from '@/lib/siteControlSettings';

const getSiteControlSettings = cache(async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Public Supabase configuration is missing; using default site settings.');
    return {
      seo: DEFAULT_SEO_SETTINGS,
      accessibility: DEFAULT_ACCESSIBILITY_SETTINGS,
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase
    .from('site_control_settings')
    .select('seo_settings, accessibility_settings')
    .eq('id', 'global')
    .maybeSingle();

  if (error) {
    console.error('Unable to load public site settings from Supabase:', error.message);
    return {
      seo: DEFAULT_SEO_SETTINGS,
      accessibility: DEFAULT_ACCESSIBILITY_SETTINGS,
    };
  }

  return {
    seo: normalizeSEOSettings(data?.seo_settings),
    accessibility: normalizeAccessibilitySettings(data?.accessibility_settings),
  };
});

export default getSiteControlSettings;
