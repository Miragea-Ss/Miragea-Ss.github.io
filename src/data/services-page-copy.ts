import { servicesOffers, type ServiceOffer, type ServicesLang } from './services-copy';

export interface ServicesPageCopy {
  meta: { title: string; description: string };
  brandSubtitle: string;
  navLabel: string;
  badge: string;
  hero: { line1: string; emphasis: string; line2: string; lead: string; primary: string; secondary: string };
  panelHeader: string;
  panelCount: string;
  panelFoot: string;
  offeringsLabel: string;
  offeringsTitle: string;
  pricePrefix: string;
  priceUnit: string;
  /** Tax-inclusive display: taxOpen + prefix + amount + taxUnit + taxClose */
  taxOpen: string;
  taxUnit: string;
  taxClose: string;
  /** If set (en/USD), shown instead of a computed tax-inclusive amount. */
  taxNote?: string;
  daysLabel: string;
  daysSuffix: string;
  priceLabel: string;
  altCard: string;
  altMain: string;
  altSub: string;
  detailLabels: { included: string; options: string; faq: string; terms: string; contact: string };
  cta: { label: string; title: string; lead: string; button: string };
  priceNote: string;
  /** "How is this different from Discovery?" block (scope comparison). */
  compare: { label: string; title: string; rows: { k: string; v: string }[]; link: { label: string; href: string } };
  /** Optional production-pipeline block (en / zh), mirrors the fixed package on the contact page. */
  production?: {
    label: string; title: string; lead: string; items: string[]; outOfScope: string;
    price: number; /** If set, shown instead of the numeric price (zh: 价格面议). */ priceText?: string; days: string; button: string;
  };
  offers: ServiceOffer[];
}

export const servicesPageCopy: Record<ServicesLang, ServicesPageCopy> = {
  ja: {
    meta: {
      title: 'サービスと料金 | Miragea · Eliora',
      description:
        'ローカルAIによる業務自動化。AI業務自動化の診断レポート、請求書・問い合わせ・文書の自動化構築、社内文書AIのPoC。クラウドにデータを送らない構成で、精度を数字で測定します。',
    },
    brandSubtitle: 'サービスと料金',
    navLabel: 'サービス',
    badge: 'ローカルAI · 業務自動化',
    hero: {
      line1: '社内の手作業を、',
      emphasis: '手元のAI',
      line2: 'で自動化する',
      lead:
        'データをクラウドのAIサービスに送らず、手元のPC内で動くローカルAIで、請求書・問い合わせ・社内文書の業務を自動化します。作る前に診断し、作ったあとは精度を数字で確かめます。',
      primary: 'お問い合わせ・ご相談へ',
      secondary: 'サービスと料金を見る',
    },
    panelHeader: 'Service menu',
    panelCount: '3 services',
    panelFoot: 'すべてオンライン完結 · 訪問・遠隔接続なし',
    offeringsLabel: 'Services',
    offeringsTitle: '3つのサービス',
    pricePrefix: '',
    priceUnit: '円',
    taxOpen: '（税込',
    taxUnit: '円',
    taxClose: '）',
    daysLabel: 'お届け日数',
    daysSuffix: '日',
    priceLabel: '基本価格',
    altCard: 'のサービス紹介画像',
    altMain: ' メイン画像',
    altSub: ' 内容の概要',
    detailLabels: {
      included: 'サービス内容',
      options: '有料オプション',
      faq: 'よくある質問',
      terms: 'ご依頼にあたってのお願い',
      contact: 'お問い合わせの際にお知らせください',
    },
    cta: {
      label: 'Contact',
      title: 'まずは、ご相談ください',
      lead: '業務の内容と、扱う書類・データの種類が分かれば、対応できる範囲とご提案をお返しします。診断のみのご依頼や、AI化を見送る判断のご相談も歓迎です。',
      button: 'お問い合わせフォームを開く',
    },
    priceNote:
      '表示価格は税別の基本料金で、括弧内は消費税10%を含む税込価格です。範囲を超える場合は、有料オプションまたは個別のお見積りでご案内します。請求・お支払いの詳細は、お見積り時にご案内します。',
    compare: {
      label: 'Which one?',
      title: 'Discoveryとの違い（どちらを選ぶか）',
      rows: [
        { k: '1つの業務の流れを整理したい', v: 'Discovery「業務分析」（25,000円・税込27,500円）：繰り返している1つの業務について、業務マップと次の一手を整理します。' },
        { k: '最大5業務を比べて、どれをAI化するか決めたい', v: 'この「診断」（30,000円・7日・税込33,000円）：5業務を採点し、ローカル／クラウドの判定、効果とコストの概算、90日の進め方をPDFにまとめます。' },
        { k: 'ツール連携や運用まで含めて、仕組みを作りたい', v: 'Discovery「仕組みの制作」（60,000円・14日・税込66,000円）：合意した1つの業務を、最大2つのツールをつないで動かします。修正1回、操作ガイドと検証記録つき。ローカルAIの構築と精度レポートは含みません（それは「構築」です）。' },
        { k: 'ローカルAIで作り、自分のサンプルで精度を測りたい', v: 'この「構築」（150,000円・21日・税込165,000円）：請求書・問い合わせ・文書Q&Aから1つを、ローカルAIで構築。精度レポートと30日の質問対応つきです。' },
      ],
      link: { label: 'Discoveryを見る', href: '/eliora/discovery/ja/' },
    },
    offers: servicesOffers.ja,
  },
  en: {
    meta: {
      title: 'Services & Pricing | Miragea · Eliora',
      description:
        'Private AI automation for business: an AI automation diagnosis, automation builds for invoices, inquiries and documents, and an internal-document AI proof of concept. Local AI, no data sent to cloud AI services, accuracy measured in numbers.',
    },
    brandSubtitle: 'Services & Pricing',
    navLabel: 'Services',
    badge: 'Enterprise · Reproducible AI',
    hero: {
      line1: 'Reproducible AI production',
      emphasis: 'for your team,',
      line2: ' on hardware you control',
      lead:
        'Documented workflows your team can re-run and check: local-AI automation for invoices, inquiries and internal documents, and ComfyUI pipelines with fixed inputs and a runbook. Accuracy is measured in numbers, and your data is never sent to a cloud AI service.',
      primary: 'Contact & consult',
      secondary: 'See services & pricing',
    },
    panelHeader: 'Service menu',
    panelCount: '3 services',
    panelFoot: 'Fully online · no site visits, no remote access to your PCs',
    offeringsLabel: 'Services',
    offeringsTitle: 'Three services',
    pricePrefix: '$',
    priceUnit: ' USD',
    taxOpen: '',
    taxUnit: '',
    taxClose: '',
    taxNote: '(excl. tax)',
    daysLabel: 'Delivery',
    daysSuffix: ' days',
    priceLabel: 'Base price',
    altCard: ' — service overview image',
    altMain: ' main image',
    altSub: ' scope overview',
    detailLabels: {
      included: 'What is included',
      options: 'Paid options',
      faq: 'FAQ',
      terms: 'Before you order',
      contact: 'What to include in your inquiry',
    },
    cta: {
      label: 'Contact',
      title: 'Start with a conversation',
      lead: 'Tell me what the work is and what kinds of documents or data it involves, and I will reply with what is feasible and a proposal. Diagnosis-only requests, and questions about whether to skip AI altogether, are welcome.',
      button: 'Open the inquiry form',
    },
    priceNote:
      'Prices are base fees in US dollars, excluding tax. Japanese consumption tax applies only to Japan-based clients. Anything beyond scope is handled with paid options or an individual quote. Invoicing and payment details are given with the quote.',
    compare: {
      label: 'Which one?',
      title: 'How this differs from Discovery',
      rows: [
        { k: 'Understand one repeated workflow', v: 'Discovery “Workflow Scan” ($700, excl. tax): a process map and the next step for one repeated task.' },
        { k: 'Compare up to 5 tasks and decide which to automate', v: 'This “Diagnosis” ($1,050, 7 days; excl. tax): five tasks scored, a local-vs-cloud verdict, a cost and benefit estimate and a 90-day roadmap, as a PDF report.' },
        { k: 'Build a workflow, including tool connections and operation', v: 'Discovery “Automation Sprint” ($850, 14 days; excl. tax): one agreed workflow connecting up to two tools, with one revision round, an operating guide and a test record. Local AI and an accuracy report are not included (that is the “Build”).' },
        { k: 'Build with local AI and measure accuracy on your own samples', v: 'This “Build” ($2,100, 21 days; excl. tax): one of invoices, inquiries or document Q&A on local AI, delivered with an accuracy report and 30 days of Q&A.' },
      ],
      link: { label: 'See Discovery', href: '/eliora/discovery/en/' },
    },
    production: {
      label: 'Production pipelines',
      title: 'Reproducible pipeline package (ComfyUI)',
      lead: 'For studios, agencies and in-house teams that need the same result on every run, not one-off images. This is the fixed package already listed on the inquiry page.',
      items: [
        'One reproducible workflow on a local bf16/fp16 stack',
        'Input and output specification',
        'A runbook your team can follow',
        'One revision included',
      ],
      outOfScope: 'One-off image generation is out of scope.',
      price: 5000,
      days: '10 business days',
      button: 'Ask about a pipeline',
    },
    offers: servicesOffers.en,
  },
  zh: {
    meta: {
      title: '服务与价格 | Miragea · Eliora',
      description:
        '本地 AI 业务自动化：AI 业务自动化诊断报告、发票/咨询/文档的自动化搭建、内部文档 AI 验证（PoC）。数据不发送到云端 AI 服务，精度以数字实测。',
    },
    brandSubtitle: '服务与价格',
    navLabel: '服务',
    badge: '创作者 · 3D+AI 工作流',
    hero: {
      line1: '3D + AI 的可控工作流，',
      emphasis: '也能接手您的重复杂务',
      line2: '',
      lead:
        '把我在 3D+AI 创作中打磨的“可控工作流”思路，用在您的创作与业务上：ComfyUI 工作流搭建，以及用运行在您自己 PC 内的本地 AI 处理发票、咨询和资料。数据不会发送到云端 AI 服务，精度用数字确认。',
      primary: '咨询与洽谈',
      secondary: '查看服务与价格',
    },
    panelHeader: 'Service menu',
    panelCount: '3 项服务',
    panelFoot: '全程在线 · 不上门、不远程连接您的 PC',
    offeringsLabel: 'Services',
    offeringsTitle: '三项服务',
    pricePrefix: '',
    priceUnit: ' 元',
    taxOpen: '',
    taxUnit: '',
    taxClose: '',
    taxNote: '（不含税）',
    daysLabel: '交付天数',
    daysSuffix: '天',
    priceLabel: '基础价格',
    altCard: ' 服务介绍图',
    altMain: ' 主图',
    altSub: ' 内容概览',
    detailLabels: {
      included: '服务内容',
      options: '付费选项',
      faq: '常见问题',
      terms: '委托须知',
      contact: '咨询时请告知',
    },
    cta: {
      label: 'Contact',
      title: '请先来聊一聊',
      lead: '告诉我业务内容，以及涉及的文件和数据类型，我会回复可行的范围和方案。只做诊断，或想咨询“是否应该放弃 AI 化”，都欢迎。',
      button: '打开咨询表单',
    },
    priceNote:
      '所示为基础价格。价格以人民币标价，不含税。日本消费税（10%）仅适用于日本境内客户。超出范围的部分，通过付费选项或单独报价处理。开票与付款等细节，在报价时说明。',
    compare: {
      label: 'Which one?',
      title: '与 Discovery 的区别（怎么选）',
      rows: [
        { k: '想先梳理一项重复工作的流程', v: 'Discovery「业务分析」（1,500 元，不含税）：针对一项反复进行的工作，整理流程图和下一步。' },
        { k: '想比较最多 5 项工作，决定先把哪项 AI 化', v: '本页的「诊断」（3,000 元 · 7 天，不含税）：对 5 项工作评分，给出本地/云端判定、效果与成本估算和 90 天计划，汇总为 PDF 报告。' },
        { k: '想搭建工作流，包括工具对接与运行', v: 'Discovery「工作流构建」（3,500 元 · 14 天，不含税）：针对一项约定的工作流，对接最多两个工具，含一轮修改、操作指南和测试记录。不含本地 AI 与精度报告（那是「搭建」）。' },
        { k: '想用本地 AI 搭建，并用自己的样本测精度', v: '本页的「搭建」（12,000 元 · 21 天，不含税）：在发票、咨询、文档问答中选一项，用本地 AI 搭建，附精度报告和 30 天答疑。' },
      ],
      link: { label: '查看 Discovery', href: '/eliora/discovery/zh/' },
    },
    production: {
      label: 'ComfyUI 工作流',
      title: '可控 ComfyUI 工作流搭建（固定套餐）',
      lead: '面向创作者、小型工作室与团队：需要每次都得到同样结果的工作流，而不是一次性出图。这是咨询页上已经列出的固定套餐。',
      items: [
        '在本地 bf16/fp16 环境上交付一条可复现工作流',
        '输入输出规格',
        '可照着执行的运行步骤',
        '含 1 次修改',
      ],
      outOfScope: '不含单张出图。',
      price: 800000,
      priceText: '价格面议',
      days: '10 个工作日',
      button: '咨询工作流搭建',
    },
    offers: servicesOffers.zh,
  },
};
