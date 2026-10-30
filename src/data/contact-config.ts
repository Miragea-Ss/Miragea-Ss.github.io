import type { AtelierLang } from './atelier-copy';

/**
 * Web3Forms 送信設定
 *
 * ★ アクセスキーを入れる場所（ここ1か所）:
 *    下の WEB3FORMS_ACCESS_KEY_DEFAULT に Web3Forms の Access Key を設定済み（2026-10-31）。変更する場合はここを置き換える。
 *    または GitHub の Secret / Variable `WEB3FORMS_ACCESS_KEY` を設定する
 *    （deploy.yml がビルド時に PUBLIC_WEB3FORMS_ACCESS_KEY として渡す。Secret が優先）。
 *
 * Access Key は公開前提の値（HTMLに出ます）。受信先メールは Web3Forms 側でキーに紐づけます。
 * 未設定（プレースホルダのまま）でもビルドは通りますが、警告を出します。送信は失敗します。
 */
export const WEB3FORMS_KEY_PLACEHOLDER = 'WEB3FORMS_KEY_PENDING';
const WEB3FORMS_ACCESS_KEY_DEFAULT = '67882b18-c2a0-4090-a722-cfd312cede61';
const WEB3FORMS_ACCESS_KEY: string =
  (import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim() || WEB3FORMS_ACCESS_KEY_DEFAULT;

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function isWeb3formsKeyPending(): boolean {
  return WEB3FORMS_ACCESS_KEY === WEB3FORMS_KEY_PLACEHOLDER;
}

if (isWeb3formsKeyPending() && !(globalThis as any).__w3fWarned) {
  (globalThis as any).__w3fWarned = true;
  console.warn('[contact] WEB3FORMS_ACCESS_KEY is still the placeholder (WEB3FORMS_KEY_PENDING): contact forms will not deliver until the key is set.');
}

export function getWeb3formsAccessKey(): string {
  return WEB3FORMS_ACCESS_KEY;
}

export const CONTACT_SITE = 'https://miragea-ss.github.io';

export function atelierContactPath(lang: AtelierLang): string {
  return `/eliora/atelier/${lang}/contact/`;
}

export function contactFormPostUrl(): string {
  return WEB3FORMS_ENDPOINT;
}

/** Always true: the form is rendered even while the key is a placeholder (see warning above). */
export function isContactFormReady(): boolean {
  return true;
}

export function contactFormPageUrl(lang: AtelierLang): string {
  return `${CONTACT_SITE}${atelierContactPath(lang)}`;
}

export function contactFormNext(lang: AtelierLang, path?: string): string {
  return `${path ? `${CONTACT_SITE}${path}` : contactFormPageUrl(lang)}?sent=1`;
}

/** Sender name shown by Web3Forms in the notification mail. */
export const CONTACT_FROM_NAME = 'Miragea · Eliora website';

export function contactFormSubject(lang: AtelierLang): string {
  const subjects: Record<AtelierLang, string> = {
    en: '[Miragea · Eliora] New project inquiry',
    ja: '[Miragea · Eliora] お仕事のご相談',
    zh: '[Miragea · Eliora] 项目咨询',
  };
  return subjects[lang];
}
