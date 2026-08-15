import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    atmosphere: z.string(),
    cover: z.string().optional(),
    intuitionDate: z.coerce.date(),
    confidence: z.number().min(0).max(100),
    topics: z.array(z.string()),
  }),
});

// These are reserved archives. Defining their loaders keeps Astro from
// auto-generating implicit collections while allowing future entries.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
});

const predictions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/predictions' }),
});

export const collections = { thoughts, blog, predictions };
