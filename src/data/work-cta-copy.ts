// Quiet closing line for Miragea-side articles (GeekSpell episodes, thoughts).
// Miragea is the owner's artistic space, so there are no prices or sales copy here;
// the line only points to Eliora, where the business side starts.
export type CtaLang = 'en' | 'ja' | 'zh';
export type CtaVariant = 'episode' | 'soft';

export const workCtaCopy: Record<CtaLang, { line: string }> = {
  en: { line: 'Looking for AI systems work? That lives at Eliora.' },
  ja: { line: 'AIの仕組みづくりのご相談は、Eliora で受けています。' },
  zh: { line: 'AI 系统与业务方面的合作，请前往 Eliora。' },
};
