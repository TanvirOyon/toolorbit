import { devTools }         from '@toolorbit/tools-dev';
import { pdfTools }         from '@toolorbit/tools-pdf';
import { imageTools }       from '@toolorbit/tools-image';
import { textTools }        from '@toolorbit/tools-text';
import { calculatorTools }  from '@toolorbit/tools-calculators';
import { validateToolDefinitions } from './schema.js';
import type { ToolDefinition, CategoryDefinition } from './types.js';

export * from './types.js';
export * from './schema.js';

// Single source of truth. Adding a new module = one line here, one import
// block + conditional chain in [slug].astro. Nothing else changes.
const ALL_TOOLS: ToolDefinition[] = [
  ...devTools,
  ...pdfTools,
  ...imageTools,
  ...textTools,
  ...calculatorTools,
];

validateToolDefinitions(ALL_TOOLS);

export { ALL_TOOLS };

export function getAllTools(): ToolDefinition[] {
  return ALL_TOOLS;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return ALL_TOOLS.filter((t) => t.category === category);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.related
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
}

export interface SearchableTool {
  slug: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
}

export function getSearchIndex(): SearchableTool[] {
  return ALL_TOOLS.map((t) => ({
    slug: t.slug,
    name: t.name,
    description: t.description,
    category: t.category,
    keywords: t.seo.keywords,
  }));
}

export function getCategoryCounts(
  categories: CategoryDefinition[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const cat of categories) {
    counts[cat.slug] = getToolsByCategory(cat.slug).length;
  }
  return counts;
}
