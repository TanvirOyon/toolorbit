/**
 * The core type system every tool in ToolOrbit must conform to.
 * A `tools-*` package exports an array of these; the registry merges
 * every package's exports into one master list at build time.
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
  /** Max ~60 chars — Google truncates titles past this. */
  title: string;
  /** Max ~160 chars. */
  description: string;
  keywords: string[];
  faq: ToolFaqEntry[];
  /** 300+ word unique HTML/markdown content rendered above the tool widget. */
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
  /** Slugs of 4-6 related tools. */
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
    description: 'Merge, split, compress, and edit PDF files — entirely in your browser.',
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
