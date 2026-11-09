import type {Metadata} from 'next';
import {Work_Sans} from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import {CartProvider} from '@/context/CartContext';
import {SearchProvider} from '@/context/SearchContext';
import {Toaster} from 'sonner';
import getSiteControlSettings from '@/lib/siteControlSettings.server';

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const {seo} = await getSiteControlSettings();
  let canonicalUrl: URL | undefined;

  try {
    canonicalUrl = new URL(seo.canonicalUrl);
  } catch {
    console.error('Invalid canonical URL in site control settings.');
  }

  return {
    metadataBase: canonicalUrl,
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.metaKeywords
      .split(',')
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    alternates: canonicalUrl ? {canonical: canonicalUrl} : undefined,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: canonicalUrl,
      images: seo.ogImage ? [seo.ogImage] : [],
      type: 'website',
    },
    twitter: {
      card: seo.twitterCard,
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    robots: {
      index: seo.robotsIndex,
      follow: seo.robotsFollow,
    },
  };
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {seo} = await getSiteControlSettings();
  let structuredData: unknown;

  try {
    structuredData = JSON.parse(seo.structuredData);
  } catch {
    console.error('Invalid structured data JSON in site control settings.');
  }

  if (
    typeof structuredData !== 'object' ||
    structuredData === null ||
    Array.isArray(structuredData) ||
    !('@context' in structuredData) ||
    !('@type' in structuredData)
  ) {
    structuredData = null;
  }

  const structuredDataJson = structuredData
    ? JSON.stringify(structuredData).replace(/</g, '\\u003c')
    : null;

  return (
    <html lang="en" className={workSans.className}>
      <body className="font-sans">
        {structuredDataJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: structuredDataJson}}
          />
        )}
        <CartProvider>
          <SearchProvider>
            <ClientLayoutWrapper>
              <Toaster richColors />
              {children}
            </ClientLayoutWrapper>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
