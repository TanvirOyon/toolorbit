import type { ToolDefinition, CategoryDefinition } from '@toolorbit/tool-registry';
import { SITE_URL, SITE_NAME } from './config';

export { SITE_URL };

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [],
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildToolJsonLd(tool: ToolDefinition) {
  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.seo.description,
    url: absoluteUrl(`/tools/${tool.slug}`),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (runs in browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.seo.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.a,
      },
    })),
  };

  return [softwareApp, faqPage];
}

export function buildCategoryJsonLd(category: CategoryDefinition, toolCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: absoluteUrl(`/${category.slug}-tools`),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: toolCount,
    },
  };
}
