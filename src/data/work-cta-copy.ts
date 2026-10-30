// "Work with me" block shown at the end of GeekSpell episodes and thoughts articles.
// Copy follows each language's positioning:
//   en = enterprise reproducible AI production, ja = business automation, zh = creator / 3D+AI workflows.
export type CtaLang = 'en' | 'ja' | 'zh';
export type CtaVariant = 'episode' | 'soft';

export interface WorkCtaCopy {
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
}

export const workCtaCopy: Record<CtaVariant, Record<CtaLang, WorkCtaCopy>> = {
  episode: {
    en: {
      eyebrow: 'Work with me',
      title: 'Need this discipline in your team’s AI work?',
      body: 'GeekSpell is about making agent work scoped, checked and repeatable. I apply the same approach to client work: reproducible pipelines and local-AI automation, with the scope and results written down.',
      primary: 'Services & pricing',
      secondary: 'Project inquiry',
    },
    ja: {
      eyebrow: 'お仕事のご相談',
      title: 'この考え方を、あなたの業務に。',
      body: 'GeekSpell で話しているのは、範囲を決め、確かめ、繰り返せる形にするやり方です。同じ方法で、請求書・問い合わせ・社内文書の業務をローカルAIで自動化します。まずは診断（30,000円）から。',
      primary: 'サービスと料金',
      secondary: 'お問い合わせ',
    },
    zh: {
      eyebrow: '一起做点什么',
      title: '想把这套可控工作流用在您的创作上？',
      body: 'GeekSpell 讲的是让 AI 代理的工作可控、可检查、可重复。同样的方法也能用在您的创作与业务上：ComfyUI 工作流搭建，或用本地 AI 处理重复杂务。',
      primary: '服务与价格',
      secondary: '项目咨询',
    },
  },
  soft: {
    en: {
      eyebrow: 'Work with me',
      title: 'If this way of seeing fits a project of yours',
      body: 'I turn this kind of attention into working systems: reproducible AI production and local-AI automation for teams. I would be glad to hear about it.',
      primary: 'Services & pricing',
      secondary: 'Project inquiry',
    },
    ja: {
      eyebrow: 'お仕事のご相談',
      title: 'この見方が、あなたの仕事の役に立つなら',
      body: 'こうした観察を、動く仕組みにします。請求書・問い合わせ・社内文書の業務を、手元のAIで自動化するお仕事を承っています。',
      primary: 'サービスと料金',
      secondary: 'お問い合わせ',
    },
    zh: {
      eyebrow: '一起做点什么',
      title: '如果这种看法适合您的项目',
      body: '我会把这样的感知变成能运转的系统：3D+AI 的可控工作流，以及本地 AI 的业务自动化。欢迎来聊聊。',
      primary: '服务与价格',
      secondary: '项目咨询',
    },
  },
};
