import type { AtelierLang } from './atelier-copy';

export interface ContactCopy {
  meta: { title: string; description: string };
  brandSubtitle: string;
  badge: string;
  title: string;
  lead: string;
  note: string;
  successTitle: string;
  successLead: string;
  successPoints: string[];
  autoresponse: string;
  formAutoreplyHint: string;
  backHome: string;
  fields: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    inquiryType: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    required: string;
  };
  inquiryTypes: { value: string; label: string }[];
  privacy: string;
  formNotReady?: string;
}

export const contactCopy: Record<AtelierLang, ContactCopy> = {
  en: {
    meta: {
      title: 'Project Inquiry | Miragea · Eliora',
      description:
        'Contact Miragea · Eliora for PoC, ComfyUI workflows, and enterprise automation. Fixed inquiry form with email reply.',
    },
    brandSubtitle: 'Project Inquiry',
    badge: 'Business · PoC · Workflows',
    title: 'Start a serious project conversation',
    lead:
      'Use this form for PoC, ComfyUI automation, workflow builds, and consulting. I reply to the email address you provide.',
    note:
      'Typical scope: reproducible pipelines, local bf16/fp16 stacks, API export, batch production — not one-off image requests.',
    successTitle: 'Inquiry received',
    successLead:
      'Your message reached Miragea · Eliora. A confirmation email was sent to the address you entered.',
    successPoints: [
      'An auto-reply email has been sent to your inbox (check spam if needed).',
      'A team member will respond within 3 business days.',
    ],
    autoresponse:
      'Thank you for contacting Miragea · Eliora (Cosmic AI Atelier). [Auto-reply] Your inquiry was received successfully. We will respond to the email address you provided within 3 business days. Please do not reply to this automated message.',
    formAutoreplyHint:
      'After you send, an auto-reply confirmation goes to your email. Personal reply within 3 business days.',
    backHome: '← Back to Atelier home',
    fields: {
      name: 'Your name',
      namePlaceholder: 'e.g. Alex Chen',
      email: 'Email (for reply)',
      emailPlaceholder: 'you@company.com',
      company: 'Company / organization (optional)',
      companyPlaceholder: 'Studio, agency, in-house team…',
      inquiryType: 'Inquiry type',
      message: 'Project details',
      messagePlaceholder:
        'Goal, timeline, budget range, tech stack, deliverables. The more concrete, the faster we can scope.',
      submit: 'Send inquiry',
      required: 'Required',
    },
    inquiryTypes: [
      { value: 'poc', label: 'Enterprise PoC / automation' },
      { value: 'workflow', label: 'ComfyUI workflow build' },
      { value: 'consulting', label: 'Consulting / advisory' },
      { value: 'partnership', label: 'Partnership / media' },
      { value: 'other', label: 'Other (describe below)' },
    ],
    privacy:
      'Your email is used only to reply to this inquiry. No newsletter signup.',
    formNotReady:
      'The inquiry form is being configured. Please check back shortly or reach out via X @Miragea_S.',
  },
  ja: {
    meta: {
      title: 'お仕事のご相談 | Miragea · Eliora',
      description:
        '企業PoC・ComfyUI業務自動化・ワークフロー構築のお問い合わせ。お名前・メール・ご用件の固定フォーム。',
    },
    brandSubtitle: 'お仕事のご相談',
    badge: '企業 · PoC · ワークフロー',
    title: '本気の仕事依頼はこちら',
    lead:
      '企業向けPoC、ComfyUI業務自動化、ワークフロー構築、コンサルティングのご相談はこのフォームから。ご記入のメールアドレスへ返信します。',
    note:
      '対象例：再現性のあるパイプライン、ローカルbf16/fp16運用、API化、バッチ量産 — 単発画像生成の依頼ではありません。',
    successTitle: 'お問い合わせを受け付けました',
    successLead:
      'お問い合わせは正常に届きました。ご記入のメールアドレスへ自動返信メールをお送りしています。',
    successPoints: [
      '受付確認の自動返信メールを送信しました（届かない場合は迷惑メールをご確認ください）。',
      '内容を確認のうえ、3営業日以内に担当よりご記入のメールアドレスへ返信します。',
    ],
    autoresponse:
      'お問い合わせありがとうございます。Miragea · Eliora（Cosmic AI Atelier）です。【自動返信】お問い合わせは正常に届きました。内容を確認のうえ、3営業日以内にご記入のメールアドレスへ担当より返信いたします。※本メールへの返信は受け付けておりません。',
    formAutoreplyHint:
      '送信後、ご記入のメールアドレスへ受付確認の自動返信をお送りします。担当からの返信は3営業日以内です。',
    backHome: '← アトリエホームへ',
    fields: {
      name: 'お名前',
      namePlaceholder: '例：山田 太郎',
      email: '連絡用メールアドレス',
      emailPlaceholder: 'you@company.co.jp',
      company: '会社名・組織名（任意）',
      companyPlaceholder: '制作会社、事業部、スタジオ名など',
      inquiryType: 'ご用件の種類',
      message: 'ご用件の詳細',
      messagePlaceholder:
        '目的、希望納期、予算感、技術環境、成果物のイメージを具体的にご記入ください。',
      submit: '送信する',
      required: '必須',
    },
    inquiryTypes: [
      { value: 'poc', label: '企業PoC・業務自動化' },
      { value: 'workflow', label: 'ComfyUIワークフロー構築' },
      { value: 'consulting', label: 'コンサルティング・顧問' },
      { value: 'partnership', label: '提携・メディア・講演' },
      { value: 'other', label: 'その他（下記に記載）' },
    ],
    privacy: 'メールアドレスは返信のみに使用します。ニュースレター登録はありません。',
    formNotReady:
      'お問い合わせフォームは現在設定中です。しばらくお待ちいただくか、X @Miragea_S までご連絡ください。',
  },
  zh: {
    meta: {
      title: '项目咨询 | Miragea · Eliora',
      description:
        '企业 PoC、ComfyUI 工作流、自动化咨询。固定格式：姓名、邮箱、需求详情，可邮件回复。',
    },
    brandSubtitle: '项目咨询',
    badge: '企业 · PoC · 工作流',
    title: '正式合作与项目咨询',
    lead:
      '企业 PoC、ComfyUI 自动化、工作流搭建、顾问咨询请用此表单。我会回复到你填写的邮箱。',
    note:
      '适合：可复现管线、本地 bf16/fp16、API 化、批量生产 — 非单张图片定制。',
    successTitle: '咨询已受理',
    successLead: '您的咨询已成功送达。我们已向您填写的邮箱发送自动确认邮件。',
    successPoints: [
      '自动确认邮件已发送（如未收到请查看垃圾邮件）。',
      '我们将在 3 个工作日内回复您填写的邮箱。',
    ],
    autoresponse:
      '感谢您联系 Miragea · Eliora（Cosmic AI Atelier）。【自动回复】您的咨询已成功送达。我们将在 3 个工作日内回复您填写的邮箱。请勿回复本自动邮件。',
    formAutoreplyHint: '提交后，系统会向您的邮箱发送自动确认。人工回复将在 3 个工作日内发出。',
    backHome: '← 返回工坊首页',
    fields: {
      name: '姓名',
      namePlaceholder: '例如：张三',
      email: '联系邮箱（用于回复）',
      emailPlaceholder: 'you@company.com',
      company: '公司 / 组织（选填）',
      companyPlaceholder: '工作室、企业部门等',
      inquiryType: '咨询类型',
      message: '需求详情',
      messagePlaceholder: '目标、时间线、预算范围、技术栈、交付物 — 越具体越容易评估。',
      submit: '提交咨询',
      required: '必填',
    },
    inquiryTypes: [
      { value: 'poc', label: '企业 PoC / 自动化' },
      { value: 'workflow', label: 'ComfyUI 工作流搭建' },
      { value: 'consulting', label: '顾问咨询' },
      { value: 'partnership', label: '合作 / 媒体' },
      { value: 'other', label: '其他（请在下方说明）' },
    ],
    privacy: '邮箱仅用于回复本次咨询，不订阅邮件列表。',
    formNotReady: '咨询表单正在配置中。请稍后再试，或通过 X @Miragea_S 联系。',
  },
};