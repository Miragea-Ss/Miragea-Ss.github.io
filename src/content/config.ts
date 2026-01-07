import { defineCollection, z } from 'astro:content';

const thoughts = defineCollection({
  type: 'content', // 你的文章/作品
  schema: z.object({
    // === 给人类看的一面 (感性) ===
    title: z.string(), // 可能是像诗一样的标题
    cover: z.string().optional(), // 视觉冲击图
    atmosphere: z.string(), // 氛围描述，例如 "Melancholic blue"
    
    // === 给 AI 看的一面 (理性数据) ===
    // 这些数据我们会在前端把它“艺术化”，在后台把它“结构化”
    intuitionDate: z.date(),
    confidence: z.number().min(0).max(100), // 确信度 (confidenceScoreとしても使用可能)
    mood: z.string().optional(), // 感情状態，例如 "Melancholic", "Serene", "Tense"
    language: z.enum(['jp', 'en', 'cn']).optional(), // 言語コード
    topics: z.array(z.string()), // 标签
  })
});

export const collections = { thoughts };