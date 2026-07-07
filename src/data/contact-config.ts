import type { AtelierLang } from './atelier-copy';

/**
 * FormSubmit 受信設定（いずれもサイトUIには表示しない）
 *
 * 1. Secret `CONTACT_INBOX` = 受信メール（初回有効化に必須）
 * 2. 有効化メールのリンクを開いた後、任意で Secret `FORM_SUBMIT_TOKEN` に切替
 *    （トークンは有効化前だと FormSubmit がメール形式エラーを返す）
 */
const FORM_SUBMIT_TOKEN = import.meta.env.PUBLIC_FORM_SUBMIT_TOKEN ?? '';
const CONTACT_INBOX = import.meta.env.PUBLIC_CONTACT_INBOX ?? '';

function isEmailEndpoint(value: string): boolean {
  return value.includes('@');
}

export const CONTACT_SITE = 'https://miragea-ss.github.io';

export function atelierContactPath(lang: AtelierLang): string {
  return `/eliora/atelier/${lang}/contact/`;
}

export function getContactEndpoint(): string {
  if (isEmailEndpoint(CONTACT_INBOX)) return CONTACT_INBOX;
  if (FORM_SUBMIT_TOKEN) return FORM_SUBMIT_TOKEN;
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