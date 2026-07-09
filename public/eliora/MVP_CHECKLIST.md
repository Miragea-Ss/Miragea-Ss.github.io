# Infinite Canvas MVP — static verification (2026-07-10)

Sources in sync:

- `H:/Grok/miragea-infinite-canvas-2026-07-08/infinite-canvas.html`
- `F:/Astro/miragea-space/public/eliora/infinite-canvas.html`  
  (same SHA256)

| must_have | Status | Evidence in code |
|-----------|--------|------------------|
| カード追加・移動・削除・複製 | OK | add buttons, drag, `duplicateSelected`, `deleteSelected` |
| 右●→左● / Connect + links 連動 | OK | `wireDrag`, ports, Connect mode, edges length UI |
| 画像 UP (file / DnD / paste) + 保持 | OK | `addImage`, drop/paste handlers, IndexedDB images |
| 初回オンボーディング | OK | `onboardingKey` v2, `ONBOARDING_STEPS` 4 steps EN/JA |
| 線0本・Connect/Reset 案内 | OK | `link-nudge`, connect hint, Reset confirm |
| localStorage + IndexedDB 安定 | OK | `storageKey` board save, idb image store, beforeunload |

Also present (beyond MVP): dual-mode Local/Cloud, Bridge 8190, JA error strings, i18n.

## operator-canvas

- In sync with work copy; already on `main` (wire UX in `8e2550a`)
- Keep as local-operator surface; product default remains `infinite-canvas.html`

## Optional remaining

- Mobile toolbar polish
- User runtime E2E when ComfyUI is running (`H:/Grok/.../test-eliora-e2e.mjs`)
