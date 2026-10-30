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
  daysLabel: string;
  daysSuffix: string;
  priceLabel: string;
  altCard: string;
  altMain: string;
  altSub: string;
  detailLabels: { included: string; options: string; faq: string; terms: string; contact: string };
  cta: { label: string; title: string; lead: string; button: string };
  priceNote: string;
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
      '表示価格は基本料金です。範囲を超える場合は、有料オプションまたは個別のお見積りでご案内します。請求・お支払い・税表記の詳細は、お見積り時にご案内します。',
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
    badge: 'Local AI · Business automation',
    hero: {
      line1: 'Automate routine work',
      emphasis: 'with private AI',
      line2: ' on your own PC',
      lead:
        'Invoices, inquiries and internal documents, handled by local AI that runs on your own PC. Your data is never sent to a cloud AI service. I diagnose before I build, and I measure accuracy in numbers afterwards.',
      primary: 'Contact & consult',
      secondary: 'See services & pricing',
    },
    panelHeader: 'Service menu',
    panelCount: '3 services',
    panelFoot: 'Fully online · no site visits, no remote access to your PCs',
    offeringsLabel: 'Services',
    offeringsTitle: 'Three services',
    pricePrefix: '¥',
    priceUnit: ' JPY',
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
      'Prices are base fees in Japanese yen. Anything beyond scope is handled with paid options or an individual quote. Invoicing, payment and tax details are given with the quote.',
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
    badge: '本地 AI · 业务自动化',
    hero: {
      line1: '把公司里的重复工作，',
      emphasis: '交给自己 PC 上的 AI',
      line2: '',
      lead:
        '发票、咨询、内部文档的处理，用运行在您自己 PC 内的本地 AI 自动化，数据不会发送到云端 AI 服务。先诊断再搭建，搭建之后用数字确认精度。',
      primary: '咨询与洽谈',
      secondary: '查看服务与价格',
    },
    panelHeader: 'Service menu',
    panelCount: '3 项服务',
    panelFoot: '全程在线 · 不上门、不远程连接您的 PC',
    offeringsLabel: 'Services',
    offeringsTitle: '三项服务',
    pricePrefix: '',
    priceUnit: '日元',
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
      '所示为基础价格（日元）。超出范围的部分，通过付费选项或单独报价处理。开票、付款与税务表示等细节，在报价时说明。',
    offers: servicesOffers.zh,
  },
};
