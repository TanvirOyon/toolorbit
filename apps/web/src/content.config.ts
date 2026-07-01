import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Astro 6 Content Layer API requires an explicit loader - the legacy
  // `type: 'content'` implicit-loader format was removed. `glob()` scans
  // the given pattern relative to `base` and loads each match as an entry,
  // using the filename (minus extension) as the entry id/slug.
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string().min(10).max(80),
    description: z.string().min(50).max(200),
    publishDate: z.string(), // ISO date: "2026-06-28"
    updatedDate: z.string().optional(),
    author:      z.string().default('Tanvirul Gani Oyon'),
    category:    z.enum(['guides', 'seo', 'dev', 'tools']),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { blog };
