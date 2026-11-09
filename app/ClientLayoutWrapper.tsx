'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import Script from 'next/script';
import {supabase} from '@/lib/supabase';
import {CartProvider} from '@/context/CartContext';
import {SearchProvider} from '@/context/SearchContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import CowSharingPopup from '@/components/popup';
import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  DEFAULT_SEO_SETTINGS,
  normalizeAccessibilitySettings,
  normalizeSEOSettings,
  type AccessibilitySettings,
  type SEOSettings,
} from '@/lib/siteControlSettings';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(
    DEFAULT_ACCESSIBILITY_SETTINGS
  );
  const [seo, setSeo] = useState<SEOSettings>(DEFAULT_SEO_SETTINGS);

  useEffect(() => {
    let active = true;

    const loadPublicSettings = async () => {
      try {
        const {data, error} = await supabase
          .from('site_control_settings')
          .select('seo_settings, accessibility_settings')
          .eq('id', 'global')
          .maybeSingle();

        if (error) throw error;

        if (active && data) {
          setSeo(normalizeSEOSettings(data.seo_settings));
          setAccessibility(
            normalizeAccessibilitySettings(data.accessibility_settings)
          );
        }
      } catch (error) {
        console.error('Unable to load storefront control-panel settings:', error);
      }
    };

    if (isAdminRoute) return;
    void loadPublicSettings();
    return () => {
      active = false;
    };
  }, [isAdminRoute, pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const attributes: Record<string, boolean> = {
      'high-contrast': accessibility.highContrast,
      'large-text': accessibility.largeText,
      'reduce-motion': accessibility.reduceMotion,
      'screen-reader-optimized': accessibility.screenReaderOptimized,
      'focus-indicators': accessibility.focusIndicators,
      'alt-text-required': accessibility.altTextRequired,
      'aria-labels': accessibility.ariaLabels,
      'keyboard-navigation': accessibility.keyboardNavigation,
      'color-blind-friendly': accessibility.colorBlindFriendly,
    };

    if (isAdminRoute) {
      Object.keys(attributes).forEach((attribute) => {
        delete root.dataset[attribute.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())];
      });
      delete root.dataset.skipNavigation;
      return;
    }

    Object.entries(attributes).forEach(([attribute, enabled]) => {
      const dataAttribute = attribute.replace(
        /-([a-z])/g,
        (_, letter: string) => letter.toUpperCase()
      );
      root.dataset[dataAttribute] = String(enabled);
    });
    root.dataset.skipNavigation = String(accessibility.skipNavigation);

    return () => {
      Object.keys(attributes).forEach((attribute) => {
        const dataAttribute = attribute.replace(
          /-([a-z])/g,
          (_, letter: string) => letter.toUpperCase()
        );
        delete root.dataset[dataAttribute];
      });
      delete root.dataset.skipNavigation;
    };
  }, [accessibility, isAdminRoute]);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <SearchProvider>
        {accessibility.skipNavigation && (
          <a className="site-skip-link" href="#main-content">
            Skip to main content
          </a>
        )}
        <Header />
        <main
          id="main-content"
          className="min-h-screen"
          aria-label={
            accessibility.ariaLabels || accessibility.screenReaderOptimized
              ? 'Main content'
              : undefined
          }
        >
          {children}
          <FloatingActionButtons />
          <CowSharingPopup />
        </main>
        <Footer />
        {/^G-[A-Z0-9]+$/i.test(seo.googleAnalyticsId) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${seo.googleAnalyticsId}');`}
            </Script>
          </>
        )}
      </SearchProvider>
    </CartProvider>
  );
}
