# Media Vault — discovery and quality brief

## Objective

Improve how visitors, social platforms, search engines, and assistive technology understand Media Vault without redesigning either the approved desktop experience or the independent smartphone experience.

## Scope

1. Generate stable `/en/`, `/ja/`, and `/zh/` Media Vault entry pages with language-correct canonical, Open Graph, and X metadata.
2. Keep `/eliora/media-vault/` as the English-first default and preserve old `?lang=` compatibility.
3. Prevent YouTube or Bilibili from loading until the visitor explicitly chooses to play a video.
4. Localize visible skip text, image alternatives, frame titles, and navigation/section accessibility labels.
5. Add structured data for Miragea, Media Vault, and Eliora Infinite Canvas.
6. Add built-output link validation to the deployment quality gate.

## Protected behavior

- Desktop and smartphone compositions, breakpoints, typography, color, logo position, cards, and image proportions must not change.
- Media Vault remains English-first and language order remains EN / JP / ZH.
- Bilibili remains an optional external Chinese-language channel and is never required by the core site.
- No public push without a separate user instruction after local verification.

## Acceptance criteria

- Raw HTML metadata is correct for each language URL without relying on JavaScript.
- Switching language reaches the matching stable language URL.
- Initial page load leaves the video iframe without an external `src`.
- Selecting the placeholder or a video card loads only the chosen provider.
- EN, JA, and ZH accessibility text matches the active language.
- All Media Vault internal links and assets resolve in the built output.
- Existing Infinite Canvas and responsive contracts, desktop metrics, smartphone metrics, and full build still pass.
