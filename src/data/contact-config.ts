import type { AtelierLang } from './atelier-copy';

/**
 * FormSubmit 受信設定（いずれもサイトUIには表示しない）
 *
 * 推奨: GitHub Actions Secret `FORM_SUBMIT_TOKEN`
 *   FormSubmit 有効化後に届くランダム文字列（メールアドレスをHTMLに出さない）
 *
 * 初回のみ: Secret `CONTACT_INBOX` に実メールを入れて有効化 → その後 TOKEN に切替
 */
const FORM_SUBMIT_TOKEN = import.meta.env.PUBLIC_FORM_SUBMIT_TOKEN ?? '';
const CONTACT_INBOX = import.meta.env.PUBLIC_CONTACT_INBOX ?? '';

export const CONTACT_SITE = 'https://miragea-ss.github.io';

export function atelierContactPath(lang: AtelierLang): string {
  return `/eliora/atelier/${lang}/contact/`;
}

export function getContactEndpoint(): string {
  if (FORM_SUBMIT_TOKEN) return FORM_SUBMIT_TOKEN;
  if (CONTACT_INBOX.includes('@')) return CONTACT_INBOX;
  return '';
}

export function contactFormPostUrl(): string {
  const endpoint = getContactEndpoint();
  return endpoint ? `https://formsubmit.co/${endpoint}` : '';
}

export function isContactFormReady(): boolean {
  return getContactEndpoint().length > 0;
}

export function contactFormPageUrl(lang: AtelierLang): string {
  return `${CONTACT_SITE}${atelierContactPath(lang)}`;
}

export function contactFormNext(lang: AtelierLang): string {
  return `${contactFormPageUrl(lang)}?sent=1`;
}

export function contactFormSubject(lang: AtelierLang): string {
  const subjects: Record<AtelierLang, string> = {
    en: '[Miragea · Eliora] New project inquiry',
    ja: '[Miragea · Eliora] お仕事のご相談',
    zh: '[Miragea · Eliora] 项目咨询',
  };
  return subjects[lang];
}