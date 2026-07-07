/**
 * Eliora — i18n (EN / JA / ZH) + Miragea ecosystem sync
 */
(function () {
  const STORAGE_KEY = "eliora-lang";
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["en", "ja", "zh"];

  const MIRAGEA_PATHS = {
    en: "/en/",
    ja: "/ja/",
    zh: "/zh/",
  };

  function getLangFromUrl() {
    const param = new URLSearchParams(window.location.search).get("lang");
    return SUPPORTED.includes(param) ? param : null;
  }

  function getLang() {
    return getLangFromUrl() || localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function updateMirageaLinks(lang) {
    const archiveUrl = MIRAGEA_PATHS[lang] || MIRAGEA_PATHS.en;
    document.querySelectorAll("[data-miragea-archive]").forEach((el) => {
      el.setAttribute("href", archiveUrl);
    });
  }

  function updateContactLinks(lang) {
    const contactUrl = `/eliora/atelier/${lang}/contact/`;
    document.querySelectorAll("[data-contact-link]").forEach((el) => {
      el.setAttribute("href", contactUrl);
    });
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    updateMirageaLinks(lang);
    updateContactLinks(lang);

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  function init() {
    setLang(getLang());

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
