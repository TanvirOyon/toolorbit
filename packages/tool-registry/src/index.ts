import { devTools } from '@toolorbit/tools-dev';
import { validateToolDefinitions } from './schema.js';
import type { ToolDefinition, CategoryDefinition } from './types.js';

export * from './types.js';
export * from './schema.js';

/**
 * Add each new `tools-*` package's exported array here. This is the ONLY
 * line that needs to change to wire in a new module (e.g. tools-pdf) —
 * nothing else in the app touches individual tool packages directly.
 */
const ALL_TOOLS: ToolDefinition[] = [...devTools];

// Fail the build loudly if any tool entry is malformed — better at build
// time than after Google has indexed a broken page.
validateToolDefinitions(ALL_TOOLS);

export function getAllTools(): ToolDefinition[] {
  return ALL_TOOLS;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return ALL_TOOLS.filter((tool) => tool.category === category);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.related
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
}

/** Lightweight projection used to build the command-palette's static JSON. */
export interface SearchableTool {
  slug: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
}

export function getSearchIndex(): SearchableTool[] {
  return ALL_TOOLS.map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    keywords: tool.seo.keywords,
  }));
}

export function getCategoryCounts(categories: CategoryDefinition[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of categories) {
    counts[category.slug] = getToolsByCategory(category.slug).length;
  }
  return counts;
}
