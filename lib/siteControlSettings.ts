export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  robotsIndex: boolean;
  robotsFollow: boolean;
  sitemapUrl: string;
  googleAnalyticsId: string;
  structuredData: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  screenReaderOptimized: boolean;
  focusIndicators: boolean;
  altTextRequired: boolean;
  skipNavigation: boolean;
  ariaLabels: boolean;
  keyboardNavigation: boolean;
  colorBlindFriendly: boolean;
}

export const DEFAULT_SEO_SETTINGS: SEOSettings = {
  metaTitle: 'Meatopia - Premium Meats & Seafood Delivery',
  metaDescription:
    'Order premium quality meats, seafood, and groceries online. Fresh delivery to your doorstep with Meatopia.',
  metaKeywords: 'premium meat, seafood delivery, online butcher, fresh groceries',
  canonicalUrl: 'https://www.meatopia.com.ng/',
  ogTitle: 'Meatopia - Premium Meats & Seafood Delivery',
  ogDescription: 'Order premium quality meats, seafood, and groceries online.',
  ogImage: 'https://res.cloudinary.com/dvvnb3ig1/image/upload/v1770144656/ut6qrgi4jlsndsflxddf.jpg',
  twitterCard: 'summary_large_image',
  robotsIndex: true,
  robotsFollow: true,
  sitemapUrl: 'https://www.meatopia.com.ng/sitemap.xml',
  googleAnalyticsId: '',
  structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "Store",\n  "name": "Meatopia"\n}',
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  screenReaderOptimized: false,
  focusIndicators: true,
  altTextRequired: true,
  skipNavigation: true,
  ariaLabels: true,
  keyboardNavigation: true,
  colorBlindFriendly: false,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

function booleanValue(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

export function normalizeSEOSettings(value: unknown): SEOSettings {
  if (!isRecord(value)) return DEFAULT_SEO_SETTINGS;

  return {
    metaTitle: stringValue(value.metaTitle, DEFAULT_SEO_SETTINGS.metaTitle),
    metaDescription: stringValue(
      value.metaDescription,
      DEFAULT_SEO_SETTINGS.metaDescription
    ),
    metaKeywords: stringValue(
      value.metaKeywords,
      DEFAULT_SEO_SETTINGS.metaKeywords
    ),
    canonicalUrl: stringValue(value.canonicalUrl, DEFAULT_SEO_SETTINGS.canonicalUrl),
    ogTitle: stringValue(value.ogTitle, DEFAULT_SEO_SETTINGS.ogTitle),
    ogDescription: stringValue(
      value.ogDescription,
      DEFAULT_SEO_SETTINGS.ogDescription
    ),
    ogImage: stringValue(value.ogImage, DEFAULT_SEO_SETTINGS.ogImage),
    twitterCard:
      value.twitterCard === 'summary' ||
      value.twitterCard === 'summary_large_image'
        ? value.twitterCard
        : DEFAULT_SEO_SETTINGS.twitterCard,
    robotsIndex: booleanValue(
      value.robotsIndex,
      DEFAULT_SEO_SETTINGS.robotsIndex
    ),
    robotsFollow: booleanValue(
      value.robotsFollow,
      DEFAULT_SEO_SETTINGS.robotsFollow
    ),
    sitemapUrl: stringValue(value.sitemapUrl, DEFAULT_SEO_SETTINGS.sitemapUrl),
    googleAnalyticsId: stringValue(
      value.googleAnalyticsId,
      DEFAULT_SEO_SETTINGS.googleAnalyticsId
    ),
    structuredData: stringValue(
      value.structuredData,
      DEFAULT_SEO_SETTINGS.structuredData
    ),
  };
}

export function normalizeAccessibilitySettings(
  value: unknown
): AccessibilitySettings {
  if (!isRecord(value)) return DEFAULT_ACCESSIBILITY_SETTINGS;

  const result = { ...DEFAULT_ACCESSIBILITY_SETTINGS };
  for (const key of Object.keys(result) as (keyof AccessibilitySettings)[]) {
    if (typeof value[key] === 'boolean') {
      result[key] = value[key];
    }
  }

  return result;
}
