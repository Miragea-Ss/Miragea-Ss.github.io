// "Work with me" strip shown under the hero of the home pages.
// Positioning is intentionally different per language (cultural localization):
//   en = enterprise reproducible AI production
//   ja = business automation
//   zh = creator / 3D+AI controllable workflows
export type BizLang = 'en' | 'ja' | 'zh';

export interface BizStripCopy {
  eyebrow: string;
  title: string;
  cells: { k: string; v: string }[];
  actions: { label: string; href: string; kind: 'primary' | 'secondary' }[];
}

export const bizStripCopy: Record<BizLang, BizStripCopy> = {
  en: {
    eyebrow: 'Work with Miragea · Eliora',
    title: 'Reproducible AI production for teams, on hardware you control',
    cells: [
      { k: 'What I build', v: 'Workflows your team can re-run with the same result: ComfyUI pipelines with fixed inputs and a runbook, and local-AI automation for invoices, inquiries and internal documents.' },
      { k: 'For whom', v: 'Studios, agencies and in-house teams that need documented, repeatable AI work rather than one-off generations.' },
      { k: 'Fees (USD, excl. tax)', v: 'Diagnosis $1,050 · Build $2,100 · Document-AI PoC $5,250 · Pipeline package $5,000. Japanese consumption tax applies only to Japan-based clients.' },
      { k: 'Evidence', v: 'Scope, specification and runbook delivered in writing. In-house tests on synthetic data: invoices 24/24 · inquiries 14/14 · document Q&A 13/13.' },
    ],
    actions: [
      { label: 'Services & pricing', href: '/eliora/atelier/en/services/', kind: 'primary' },
      { label: 'Project inquiry', href: '/eliora/atelier/en/contact/', kind: 'secondary' },
    ],
  },
  ja: {
    eyebrow: 'お仕事のご相談',
    title: '社内の手作業を、手元のAIで自動化します',
    cells: [
      { k: 'できること', v: '請求書・問い合わせ・社内文書の業務を、手元のPCで動くローカルAIで自動化します。データはクラウドAIに送りません。' },
      { k: '対象', v: '繰り返しの事務作業を抱える、中小企業・個人事業主・小さなチーム。' },
      { k: '料金（税別）', v: '診断 30,000円（税込33,000円） · 構築 150,000円（税込165,000円） · 社内文書AIのPoC 300,000円（税込330,000円）' },
      { k: '根拠', v: '自社検証・合成データ：請求書 24/24 · 問い合わせ 14/14 · 社内文書Q&A 13/13。' },
    ],
    actions: [
      { label: 'サービスと料金', href: '/eliora/atelier/ja/services/', kind: 'primary' },
      { label: 'お問い合わせ', href: '/eliora/atelier/ja/contact/', kind: 'secondary' },
    ],
  },
  zh: {
    eyebrow: '与 Miragea · Eliora 合作',
    title: '3D + AI 的可控工作流，也能接手您的重复杂务',
    cells: [
      { k: '能做什么', v: '把 3D+AI 创作中打磨的“可控工作流”思路，用在您的创作与业务上：ComfyUI 工作流搭建，以及用本地 AI 处理发票、咨询和资料。' },
      { k: '适合谁', v: '个人创作者、小型工作室与个体经营者——想把重复工作交给流程，把时间留给创作的人。' },
      { k: '价格（人民币，不含税）', v: '诊断 3,000 元 · 搭建 12,000 元 · 文档 AI PoC 15,000 元 · ComfyUI 工作流套餐 价格面议。日本消费税（10%）仅适用于日本境内客户。' },
      { k: '依据', v: '制作过程公开在「制作解说」中。自有验证·合成数据：发票 24/24 · 咨询 14/14 · 文档问答 13/13。' },
    ],
    actions: [
      { label: '服务与价格', href: '/eliora/atelier/zh/services/', kind: 'primary' },
      { label: '查看制作解说', href: '/eliora/atelier/zh/#bts', kind: 'secondary' },
      { label: '项目咨询', href: '/eliora/atelier/zh/contact/', kind: 'secondary' },
    ],
  },
};
