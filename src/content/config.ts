// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const thoughts = defineCollection({
  type: 'content', 
  schema: z.object({
    // === 人間に見せるアートな側面 ===
    title: z.string(),
    atmosphere: z.string(), // その時の「空気感」
    cover: z.string().optional(), // 画像があれば

    // === AIに見せるデータな側面 ===
    intuitionDate: z.date(), // 直感を感じた日時
    confidence: z.number().min(0).max(100), // 確信度 (0-100)
    topics: z.array(z.string()), // タグ
  })
});

export const collections = { thoughts };