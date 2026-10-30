import { servicesOffers, type ServiceOffer } from './services-copy';

export interface ServicesPageCopy {
  meta: { title: string; description: string };
  brandSubtitle: string;
  navLabel: string;
  badge: string;
  hero: { line1: string; emphasis: string; line2: string; lead: string; primary: string; secondary: string };
  panelHeader: string;
  panelFoot: string;
  offeringsLabel: string;
  offeringsTitle: string;
  priceUnit: string;
  daysLabel: string;
  priceLabel: string;
  viewDetail: string;
  detailLabels: { included: string; options: string; faq: string; terms: string; contact: string; optionPrice: string };
  cta: { label: string; title: string; lead: string; button: string };
  priceNote: string;
  offers: ServiceOffer[];
}

export const servicesPageCopy: Record<'ja', ServicesPageCopy> = {
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
    panelFoot: 'すべてオンライン完結 · 訪問・遠隔接続なし',
    offeringsLabel: 'Services',
    offeringsTitle: '3つのサービス',
    priceUnit: '円',
    daysLabel: 'お届け日数',
    priceLabel: '基本価格',
    viewDetail: '詳細を見る',
    detailLabels: {
      included: 'サービス内容',
      options: '有料オプション',
      faq: 'よくある質問',
      terms: 'ご依頼にあたってのお願い',
      contact: 'お問い合わせの際にお知らせください',
      optionPrice: '価格',
    },
    cta: {
      label: 'Contact',
      title: 'まずは、ご相談ください',
      lead: '業務の内容と、扱う書類・データの種類が分かれば、対応できる範囲とご提案をお返しします。診断のみのご依頼や、AI化を見送る判断のご相談も歓迎です。',
      button: 'お問い合わせフォームを開く',
    },
    priceNote:
      '表示価格は基本料金です。範囲を超える場合は、有料オプションまたは個別のお見積りでご案内します。請求・お支払い・税表記の詳細は、お見積り時にご案内します。',
    offers: servicesOffers,
  },
};
