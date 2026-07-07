import type { AtelierLang } from './atelier-copy';

/** 受信メール（FormSubmit 初回送信時にアクティベーションが必要） */
export const CONTACT_EMAIL = 'hello@eliora.studio';

export const CONTACT_SITE = 'https://miragea-ss.github.io';

export function atelierContactPath(lang: AtelierLang): string {
  return `/eliora/atelier/${lang}/contact/`;
}

export function contactFormAction(): string {
  return `https://formsubmit.co/${CONTACT_EMAIL}`;
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