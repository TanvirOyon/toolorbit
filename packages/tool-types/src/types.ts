/**
 * The core type system every tool in ToolOrbit must conform to.
 *
 * This package is intentionally dependency-free. Every `tools-*` package
 * (tools-dev, tools-pdf, etc.) imports ONLY from here for the `ToolDefinition`
 * type - never from `@toolorbit/tool-registry`. The registry package is the
 * aggregator that depends on every `tools-*` package to assemble `ALL_TOOLS`;
 * if a `tools-*` package depended back on the registry, that would create a
 * circular package dependency (registry -> tools-dev -> registry). Keeping
 * the type definition in its own leaf package keeps the dependency graph a
 * clean one-directional DAG:
 *
 *   tool-types  <--  tools-dev, tools-pdf, tools-image, ...  <--  tool-registry
 *
 * Do not add any dependency to this package's package.json. If a type here
 * ever needs something from another package, that is a sign that thing
 * belongs in this package instead.
 */

export type ToolKind = 'client-pure' | 'client-wasm-heavy' | 'edge-light' | 'metered';

export type ToolCategory =
  | 'developer'
  | 'pdf'
  | 'image'
  | 'text'
  | 'calculator'
  | 'seo'
  | 'ai';

export interface ToolFaqEntry {
  q: string;
  a: string;
}

export interface ToolSeo {
  /** Max ~60 chars - Google truncates titles past this. */
  title: string;
  /** Max ~160 chars. */
  description: string;
  keywords: string[];
  faq: ToolFaqEntry[];
  /** 600+ word unique HTML content rendered above the tool widget. */
  content: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  category: ToolCategory;
  kind: ToolKind;
  /** Lucide icon name. */
  icon: string;
  /** Short one-line description used in cards. */
  description: string;
  /** Identifier matching a file in src/islands/tools/<component>.tsx */
  component: string;
  seo: ToolSeo;
  /** Slugs of 2-8 related tools. */
  related: string[];
}

export interface CategoryDefinition {
  slug: string;
  name: string;
  description: string;
  icon: string;
  /** Tailwind-safe accent token name, e.g. 'interactive'. */
  color: string;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'developer',
    name: 'Developer Tools',
    description:
      'JSON, encoding, hashing, and other everyday utilities for writing and debugging code.',
    icon: 'terminal',
    color: 'interactive',
  },
  {
    slug: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress, and edit PDF files - entirely in your browser.',
    icon: 'file-text',
    color: 'interactive',
  },
  {
    slug: 'image',
    name: 'Image Tools',
    description: 'Convert, compress, crop, and resize images without uploading them anywhere.',
    icon: 'image',
    color: 'interactive',
  },
  {
    slug: 'text',
    name: 'Text Tools',
    description: 'Counters, case converters, and other plain-text utilities.',
    icon: 'type',
    color: 'interactive',
  },
  {
    slug: 'calculator',
    name: 'Calculators',
    description: 'GPA, scientific, and everyday calculators that run instantly client-side.',
    icon: 'calculator',
    color: 'interactive',
  },
  {
    slug: 'seo',
    name: 'SEO Tools',
    description: 'Meta tag, robots.txt, sitemap, and schema generators for your own site.',
    icon: 'search',
    color: 'interactive',
  },
];
