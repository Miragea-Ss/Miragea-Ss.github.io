import type { AtelierLang } from './atelier-copy';

/**
 * 受信メール（FormSubmit 用・サイトには表示しない）
 * GitHub → Settings → Secrets and variables → Actions → Variables
 *   名前: CONTACT_INBOX  値: 実在するメールアドレス
 * 初回送信時に FormSubmit から確認メールが届く → リンクで有効化
 */
export const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_INBOX ?? '';

export const CONTACT_SITE = 'https://miragea-ss.github.io';

export function atelierContactPath(lang: AtelierLang): string {
  return `/eliora/atelier/${lang}/contact/`;
}

export function contactFormAction(): string {
  if (!CONTACT_EMAIL) return '';
  return `https://formsubmit.co/${CONTACT_EMAIL}`;
}

export function isContactFormReady(): boolean {
  return CONTACT_EMAIL.length > 0 && CONTACT_EMAIL.includes('@');
}

export function contactFormNext(lang: AtelierLang): string {
  return `${CONTACT_SITE}${atelierContactPath(lang)}?sent=1`;
}

export function contactFormSubject(lang: AtelierLang): string {
  const subjects: Record<AtelierLang, string> = {
    en: '[Miragea · Eliora] New project inquiry',
    ja: '[Miragea · Eliora] お仕事のご相談',
    zh: '[Miragea · Eliora] 项目咨询',
  };
  return subjects[lang];
}