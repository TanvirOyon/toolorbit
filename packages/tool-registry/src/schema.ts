import { z } from 'zod';

export const toolFaqSchema = z.object({
  q: z.string().min(5),
  a: z.string().min(10),
});

export const toolSeoSchema = z.object({
  title: z.string().min(20).max(70), // Google truncates at ~60 chars; allow slack for review
  description: z.string().min(50).max(160),
  keywords: z.array(z.string()).min(3),
  faq: z.array(toolFaqSchema).min(2),
  content: z.string().min(600),
});

export const toolDefinitionSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be lowercase kebab-case'),
  name: z.string().min(3),
  category: z.enum(['developer', 'pdf', 'image', 'text', 'calculator', 'seo', 'ai']),
  kind: z.enum(['client-pure', 'client-wasm-heavy', 'edge-light', 'metered']),
  icon: z.string(),
  description: z.string().min(20),
  component: z.string(),
  seo: toolSeoSchema,
  related: z.array(z.string()).min(2).max(8),
});

export type ToolDefinitionInput = z.infer<typeof toolDefinitionSchema>;

/**
 * Validates a full list of tool definitions and throws a single, readable
 * error listing every failure (slug + path) instead of failing on the
 * first one - far less painful when a content pass touches 30 tools at once.
 */
export function validateToolDefinitions(tools: unknown[]): void {
  const errors: string[] = [];

  for (const tool of tools) {
    const result = toolDefinitionSchema.safeParse(tool);
    if (!result.success) {
      const slug =
        typeof tool === 'object' && tool !== null && 'slug' in tool
          ? String((tool as Record<string, unknown>).slug)
          : '<unknown slug>';
      for (const issue of result.error.issues) {
        errors.push(`[${slug}] ${issue.path.join('.')}: ${issue.message}`);
      }
    }
  }

  // Duplicate slug check
  const slugs = tools
    .filter((t): t is { slug: string } => typeof t === 'object' && t !== null && 'slug' in t)
    .map((t) => t.slug);
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (seen.has(slug)) errors.push(`Duplicate slug detected: "${slug}"`);
    seen.add(slug);
  }

  if (errors.length > 0) {
    throw new Error(
      `Tool registry validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):\n` +
        errors.map((e) => `  - ${e}`).join('\n')
    );
  }
}
