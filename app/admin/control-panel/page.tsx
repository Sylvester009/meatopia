'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Globe,
  Eye,
  Accessibility,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Type,
  Image as ImageIcon,
  Link2,
  Code,
  Smartphone,
  Monitor,
  LogOut,
  TrendingUp,
  Settings,
  FileText,
  Shield,
} from 'lucide-react';

// Types
interface SEOSettings {
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

interface AccessibilitySettings {
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

interface AuditItem {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  recommendation: string;
  category: 'seo' | 'accessibility';
}

const isValidHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

const getContrastRatio = (foreground: string, background: string) => {
  const getLuminance = (color: string) => {
    const channels = color
      .replace('#', '')
      .match(/.{2}/g)
      ?.map((channel) => parseInt(channel, 16) / 255);

    if (!channels || channels.length !== 3) return 1;

    const adjusted = channels.map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
    );
    return adjusted[0] * 0.2126 + adjusted[1] * 0.7152 + adjusted[2] * 0.0722;
  };

  const lighter = Math.max(getLuminance(foreground), getLuminance(background));
  const darker = Math.min(getLuminance(foreground), getLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

const buildAuditItems = (
  seoSettings: SEOSettings,
  accessibilitySettings: AccessibilitySettings
): AuditItem[] => {
  const titleLength = seoSettings.metaTitle.trim().length;
  const descriptionLength = seoSettings.metaDescription.trim().length;
  let structuredDataValid = false;

  try {
    const structuredData = JSON.parse(seoSettings.structuredData);
    structuredDataValid = Boolean(structuredData['@context'] && structuredData['@type']);
  } catch {
    structuredDataValid = false;
  }

  return [
    {
      id: 'meta-title',
      label: 'Meta title length',
      status:
        titleLength >= 50 && titleLength <= 60
          ? 'pass'
          : titleLength > 0 && titleLength <= 70
          ? 'warning'
          : 'fail',
      message: `${titleLength} characters. Recommended range: 50-60.`,
      recommendation: 'Keep the title descriptive and within 50-60 characters.',
      category: 'seo',
    },
    {
      id: 'meta-description',
      label: 'Meta description length',
      status:
        descriptionLength >= 150 && descriptionLength <= 160
          ? 'pass'
          : descriptionLength > 0 && descriptionLength <= 180
          ? 'warning'
          : 'fail',
      message: `${descriptionLength} characters. Recommended range: 150-160.`,
      recommendation: 'Write a unique description between 150 and 160 characters.',
      category: 'seo',
    },
    {
      id: 'canonical-url',
      label: 'Canonical URL',
      status: isValidHttpsUrl(seoSettings.canonicalUrl) ? 'pass' : 'fail',
      message: isValidHttpsUrl(seoSettings.canonicalUrl)
        ? 'A valid HTTPS canonical URL is configured.'
        : 'The canonical URL is missing or is not a valid HTTPS URL.',
      recommendation: 'Set the canonical URL to the preferred HTTPS version of the page.',
      category: 'seo',
    },
    {
      id: 'sitemap-url',
      label: 'Sitemap URL',
      status: isValidHttpsUrl(seoSettings.sitemapUrl) ? 'pass' : 'warning',
      message: isValidHttpsUrl(seoSettings.sitemapUrl)
        ? 'A valid HTTPS sitemap URL is configured.'
        : 'The sitemap URL should be a valid HTTPS URL.',
      recommendation: 'Add the live sitemap URL and verify that it returns an accessible XML sitemap.',
      category: 'seo',
    },
    {
      id: 'structured-data',
      label: 'Structured data format',
      status: structuredDataValid ? 'pass' : 'fail',
      message: structuredDataValid
        ? 'Structured data contains a context and type.'
        : 'Structured data is not valid JSON-LD with both @context and @type.',
      recommendation: 'Add valid JSON-LD and validate it with the appropriate search engine testing tool.',
      category: 'seo',
    },
    {
      id: 'robots-directives',
      label: 'Robots directives',
      status: seoSettings.robotsIndex && seoSettings.robotsFollow ? 'pass' : 'warning',
      message:
        seoSettings.robotsIndex && seoSettings.robotsFollow
          ? 'Indexing and link following are enabled.'
          : 'Indexing or link following is disabled in the current settings.',
      recommendation: 'Confirm these directives match the pages you want search engines to discover.',
      category: 'seo',
    },
    {
      id: 'alt-text-policy',
      label: 'Alt text policy',
      status: accessibilitySettings.altTextRequired ? 'pass' : 'fail',
      message: accessibilitySettings.altTextRequired
        ? 'Alt text is required for uploaded images.'
        : 'Uploaded images are not required to have alt text.',
      recommendation: 'Require meaningful alt text for informative images and empty alt text for decorative images.',
      category: 'accessibility',
    },
    {
      id: 'keyboard-focus',
      label: 'Keyboard and focus settings',
      status:
        accessibilitySettings.keyboardNavigation && accessibilitySettings.focusIndicators
          ? 'pass'
          : 'fail',
      message:
        accessibilitySettings.keyboardNavigation && accessibilitySettings.focusIndicators
          ? 'Keyboard navigation and visible focus indicators are enabled.'
          : 'Keyboard navigation and visible focus indicators must both be enabled.',
      recommendation: 'Enable both settings, then test the storefront using only a keyboard.',
      category: 'accessibility',
    },
    {
      id: 'assistive-technology',
      label: 'Assistive technology settings',
      status:
        accessibilitySettings.ariaLabels && accessibilitySettings.screenReaderOptimized
          ? 'pass'
          : 'warning',
      message:
        accessibilitySettings.ariaLabels && accessibilitySettings.screenReaderOptimized
          ? 'ARIA labels and screen reader support are enabled.'
          : 'ARIA labels or screen reader support is not fully enabled.',
      recommendation: 'Enable both settings and manually verify accessible names and reading order.',
      category: 'accessibility',
    },
    {
      id: 'visual-accessibility',
      label: 'Visual accessibility preferences',
      status:
        accessibilitySettings.highContrast || accessibilitySettings.colorBlindFriendly
          ? 'pass'
          : 'warning',
      message:
        accessibilitySettings.highContrast || accessibilitySettings.colorBlindFriendly
          ? 'An enhanced visual accessibility preference is enabled.'
          : 'No enhanced contrast or color-blind preference is enabled.',
      recommendation: 'Validate actual color contrast separately; these preferences do not prove WCAG compliance.',
      category: 'accessibility',
    },
  ];
};

export default function SEOAccessibilityPanel() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'seo' | 'accessibility' | 'audit'>('seo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [auditing, setAuditing] = useState(false);
  const [lastAuditAt, setLastAuditAt] = useState<string | null>(null);
  const [contrastForeground, setContrastForeground] = useState('#162210');
  const [contrastBackground, setContrastBackground] = useState('#ffffff');
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'general',
    'social',
    'technical',
  ]);

  // SEO Settings State
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    metaTitle: 'Meatopia - Premium Meats & Seafood Delivery',
    metaDescription:
      'Order premium quality meats, seafood, and groceries online. Fresh delivery to your doorstep with Meatopia.',
    metaKeywords: 'premium meat, seafood delivery, online butcher, fresh groceries',
    canonicalUrl: 'https://meatopia.com',
    ogTitle: 'Meatopia - Premium Meats & Seafood Delivery',
    ogDescription: 'Order premium quality meats, seafood, and groceries online.',
    ogImage: 'https://res.cloudinary.com/dvvnb3ig1/image/upload/v1770144656/ut6qrgi4jlsndsflxddf.jpg',
    twitterCard: 'summary_large_image',
    robotsIndex: true,
    robotsFollow: true,
    sitemapUrl: 'https://meatopia.com/sitemap.xml',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "Store",\n  "name": "Meatopia"\n}',
  });

  // Accessibility Settings State
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
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
  });

  const auditItems = useMemo(
    () => buildAuditItems(seoSettings, accessibilitySettings),
    [seoSettings, accessibilitySettings]
  );
  const contrastRatio = getContrastRatio(contrastForeground, contrastBackground);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  const checkAuth = async () => {
    try {
      // Replace with actual auth check
      setUser({ email: 'admin@meatopia.com' });
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRunAudit = async () => {
    setAuditing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLastAuditAt(new Date().toISOString());
    setAuditing(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const getAuditStats = useMemo(() => {
    const seoItems = auditItems.filter((i) => i.category === 'seo');
    const a11yItems = auditItems.filter((i) => i.category === 'accessibility');
    return {
      seo: {
        pass: seoItems.filter((i) => i.status === 'pass').length,
        warning: seoItems.filter((i) => i.status === 'warning').length,
        fail: seoItems.filter((i) => i.status === 'fail').length,
        total: seoItems.length,
      },
      accessibility: {
        pass: a11yItems.filter((i) => i.status === 'pass').length,
        warning: a11yItems.filter((i) => i.status === 'warning').length,
        fail: a11yItems.filter((i) => i.status === 'fail').length,
        total: a11yItems.length,
      },
    };
  }, [auditItems]);

  const getScore = (stats: { pass: number; warning: number; fail: number; total: number }) => {
    if (stats.total === 0) return 100;
    return Math.round(((stats.pass + stats.warning * 0.5) / stats.total) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'fail':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Save Toast */}
      {showSaveToast && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Settings saved successfully</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dvvnb3ig1/image/upload/v1770144656/ut6qrgi4jlsndsflxddf.jpg"
                alt="Meatopia"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Meatopia Admin
              </h1>
              <p className="text-xs text-gray-500">SEO & Accessibility</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              View Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              SEO & Accessibility Control Panel
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Optimize your store for search engines and ensure accessibility for all users
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#162210] px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-[#162210] border-t-transparent rounded-full" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">SEO Config Score</p>
                <p className={`text-3xl font-bold mt-1 ${getScoreColor(getScore(getAuditStats.seo))}`}>
                  {getScore(getAuditStats.seo)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="text-green-600">{getAuditStats.seo.pass} passed</span>
              <span className="text-gray-300">•</span>
              <span className="text-yellow-600">{getAuditStats.seo.warning} warnings</span>
              <span className="text-gray-300">•</span>
              <span className="text-red-600">{getAuditStats.seo.fail} failed</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Accessibility Config Score</p>
                <p className={`text-3xl font-bold mt-1 ${getScoreColor(getScore(getAuditStats.accessibility))}`}>
                  {getScore(getAuditStats.accessibility)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Accessibility className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="text-green-600">{getAuditStats.accessibility.pass} passed</span>
              <span className="text-gray-300">•</span>
              <span className="text-yellow-600">{getAuditStats.accessibility.warning} warnings</span>
              <span className="text-gray-300">•</span>
              <span className="text-red-600">{getAuditStats.accessibility.fail} failed</span>
            </div>
          </div>

          

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">WCAG Level</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">AA</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span>Target: WCAG 2.2 AA</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto">
              {[
                { id: 'seo' as const, label: 'SEO Settings', icon: Globe },
                { id: 'accessibility' as const, label: 'Accessibility', icon: Accessibility },
                { id: 'audit' as const, label: 'Audit Results', icon: Search },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SEO Settings Tab */}
          {activeTab === 'seo' && (
            <div className="p-6 space-y-6">
              {/* General SEO */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('general')}
                  className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-900">General SEO</span>
                  </div>
                  {expandedSections.includes('general') ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.includes('general') && (
                  <div className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={seoSettings.metaTitle}
                        onChange={(e) =>
                          setSeoSettings({ ...seoSettings, metaTitle: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="Enter meta title"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          Recommended: 50-60 characters
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            seoSettings.metaTitle.length > 60
                              ? 'text-red-500'
                              : seoSettings.metaTitle.length >= 50
                              ? 'text-green-500'
                              : 'text-yellow-500'
                          }`}
                        >
                          {seoSettings.metaTitle.length}/60
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={seoSettings.metaDescription}
                        onChange={(e) =>
                          setSeoSettings({ ...seoSettings, metaDescription: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                        placeholder="Enter meta description"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          Recommended: 150-160 characters
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            seoSettings.metaDescription.length > 160
                              ? 'text-red-500'
                              : seoSettings.metaDescription.length >= 150
                              ? 'text-green-500'
                              : 'text-yellow-500'
                          }`}
                        >
                          {seoSettings.metaDescription.length}/160
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Keywords
                      </label>
                      <input
                        type="text"
                        value={seoSettings.metaKeywords}
                        onChange={(e) =>
                          setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Separate keywords with commas
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Canonical URL
                      </label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={seoSettings.canonicalUrl}
                          onChange={(e) =>
                            setSeoSettings({ ...seoSettings, canonicalUrl: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={seoSettings.robotsIndex}
                          onChange={(e) =>
                            setSeoSettings({ ...seoSettings, robotsIndex: e.target.checked })
                          }
                          className="w-4 h-4 accent-[#6cee2b] border-gray-300 rounded focus:ring-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Allow Indexing
                          </span>
                          <p className="text-xs text-gray-500">
                            Let search engines index this site
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={seoSettings.robotsFollow}
                          onChange={(e) =>
                            setSeoSettings({ ...seoSettings, robotsFollow: e.target.checked })
                          }
                          className="w-4 h-4 accent-[#6cee2b] border-gray-300 rounded focus:ring-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Allow Following
                          </span>
                          <p className="text-xs text-gray-500">
                            Let search engines follow links
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('social')}
                  className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-900">Social Media (Open Graph)</span>
                  </div>
                  {expandedSections.includes('social') ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.includes('social') && (
                  <div className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Title
                      </label>
                      <input
                        type="text"
                        value={seoSettings.ogTitle}
                        onChange={(e) =>
                          setSeoSettings({ ...seoSettings, ogTitle: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Description
                      </label>
                      <textarea
                        value={seoSettings.ogDescription}
                        onChange={(e) =>
                          setSeoSettings({ ...seoSettings, ogDescription: e.target.value })
                        }
                        rows={2}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        OG Image URL
                      </label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={seoSettings.ogImage}
                          onChange={(e) =>
                            setSeoSettings({ ...seoSettings, ogImage: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        />
                      </div>
                      {seoSettings.ogImage && (
                        <div className="mt-3 w-full max-w-xs h-32 bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={seoSettings.ogImage}
                            alt="OG Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter Card Type
                      </label>
                      <select
                        value={seoSettings.twitterCard}
                        onChange={(e) =>
                          setSeoSettings({
                            ...seoSettings,
                            twitterCard: e.target.value as 'summary' | 'summary_large_image',
                          })
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      >
                        <option value="summary">Summary</option>
                        <option value="summary_large_image">Summary with Large Image</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Technical SEO */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('technical')}
                  className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-900">Technical SEO</span>
                  </div>
                  {expandedSections.includes('technical') ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.includes('technical') && (
                  <div className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sitemap URL
                      </label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={seoSettings.sitemapUrl}
                          onChange={(e) =>
                            setSeoSettings({ ...seoSettings, sitemapUrl: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Google Analytics ID
                      </label>
                      <input
                        type="text"
                        value={seoSettings.googleAnalyticsId}
                        onChange={(e) =>
                          setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Structured Data (JSON-LD)
                      </label>
                      <textarea
                        value={seoSettings.structuredData}
                        onChange={(e) =>
                          setSeoSettings({ ...seoSettings, structuredData: e.target.value })
                        }
                        rows={6}
                        className="w-full px-4 py-2.5 bg-gray-900 text-green-400 border border-gray-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Schema.org structured data for rich snippets
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* SERP Preview */}
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Result Preview
                </h3>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <p className="text-xs text-green-700 mb-1">
                    {seoSettings.canonicalUrl || 'https://example.com'}
                  </p>
                  <h4 className="text-blue-700 text-lg font-medium hover:underline cursor-pointer">
                    {seoSettings.metaTitle || 'Page Title'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {seoSettings.metaDescription || 'Page description will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Accessibility Tab */}
          {activeTab === 'accessibility' && (
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    WCAG 2.2 AA Target
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    These settings support accessibility, but the audit below is not a full WCAG
                    conformance assessment.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Contrast checker</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Test a foreground and background pair against WCAG thresholds.
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      contrastRatio >= 7
                        ? 'bg-green-100 text-green-800'
                        : contrastRatio >= 4.5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {contrastRatio.toFixed(2)}:1
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="color"
                      value={contrastForeground}
                      onChange={(e) => setContrastForeground(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                    />
                    Foreground
                  </label>
                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="color"
                      value={contrastBackground}
                      onChange={(e) => setContrastBackground(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                    />
                    Background
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  {contrastRatio >= 7
                    ? 'Passes WCAG AA and AAA for normal text.'
                    : contrastRatio >= 4.5
                    ? 'Passes WCAG AA for normal text, but not AAA.'
                    : 'Does not meet WCAG AA for normal text.'}
                </p>
              </div>

              {/* Visual Accessibility */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-900">Visual Accessibility</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      key: 'highContrast' as const,
                      label: 'High Contrast Mode',
                      description: 'Increase contrast for better readability',
                      icon: Eye,
                    },
                    {
                      key: 'largeText' as const,
                      label: 'Large Text',
                      description: 'Increase base font size across the site',
                      icon: Type,
                    },
                    {
                      key: 'reduceMotion' as const,
                      label: 'Reduce Motion',
                      description: 'Minimize animations and transitions',
                      icon: Monitor,
                    },
                    {
                      key: 'colorBlindFriendly' as const,
                      label: 'Color Blind Friendly',
                      description: 'Use patterns and shapes alongside colors',
                      icon: Eye,
                    },
                  ].map((setting) => (
                    <label
                      key={setting.key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <setting.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{setting.label}</p>
                          <p className="text-xs text-gray-500">{setting.description}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={accessibilitySettings[setting.key]}
                          onChange={(e) =>
                            setAccessibilitySettings({
                              ...accessibilitySettings,
                              [setting.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Screen Reader & Navigation */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Accessibility className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-900">
                      Screen Reader & Navigation
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      key: 'screenReaderOptimized' as const,
                      label: 'Screen Reader Optimized',
                      description: 'Enhance compatibility with screen readers',
                    },
                    {
                      key: 'focusIndicators' as const,
                      label: 'Visible Focus Indicators',
                      description: 'Show clear focus outlines for keyboard users',
                    },
                    {
                      key: 'skipNavigation' as const,
                      label: 'Skip Navigation Links',
                      description: 'Allow users to skip repetitive navigation',
                    },
                    {
                      key: 'ariaLabels' as const,
                      label: 'ARIA Labels',
                      description: 'Add descriptive labels to interactive elements',
                    },
                    {
                      key: 'keyboardNavigation' as const,
                      label: 'Keyboard Navigation',
                      description: 'Ensure all features work with keyboard only',
                    },
                    {
                      key: 'altTextRequired' as const,
                      label: 'Require Alt Text',
                      description: 'Enforce alt text for all uploaded images',
                    },
                  ].map((setting) => (
                    <label
                      key={setting.key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{setting.label}</p>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={accessibilitySettings[setting.key]}
                          onChange={(e) =>
                            setAccessibilitySettings({
                              ...accessibilitySettings,
                              [setting.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Audit Results Tab */}
          {activeTab === 'audit' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Audit summary</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Checks the SEO and accessibility configuration currently entered in this panel.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {lastAuditAt
                      ? `Last run: ${new Date(lastAuditAt).toLocaleString()}`
                      : 'No audit has been run yet'}
                  </p>
                </div>
                <button
                  onClick={handleRunAudit}
                  disabled={auditing}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-[#162210] rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {auditing ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-[#162210] border-t-transparent rounded-full" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {auditing ? 'Running audit...' : 'Run audit'}
                </button>
              </div>
              <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-800">
                This audit checks configured values and preferences only. It does not crawl storefront
                pages, test live contrast, validate sitemap availability, or guarantee search rankings
                or WCAG compliance.
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SEO Audit */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    SEO Audit ({getAuditStats.seo.pass}/{getAuditStats.seo.total} passed)
                  </h3>
                  <div className="space-y-3">
                    {auditItems
                      .filter((item) => item.category === 'seo')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                        >
                          {getStatusIcon(item.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{item.label}</p>
                              <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                                  item.status
                                )}`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{item.message}</p>
                            <p className="text-xs text-gray-600 mt-2">
                              <span className="font-medium">Recommendation:</span>{' '}
                              {item.recommendation}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Accessibility Audit */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Accessibility className="w-4 h-4" />
                    Accessibility Audit (
                    {getAuditStats.accessibility.pass}/{getAuditStats.accessibility.total} passed)
                  </h3>
                  <div className="space-y-3">
                    {auditItems
                      .filter((item) => item.category === 'accessibility')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                        >
                          {getStatusIcon(item.status)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{item.label}</p>
                              <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                                  item.status
                                )}`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{item.message}</p>
                            <p className="text-xs text-gray-600 mt-2">
                              <span className="font-medium">Recommendation:</span>{' '}
                              {item.recommendation}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}