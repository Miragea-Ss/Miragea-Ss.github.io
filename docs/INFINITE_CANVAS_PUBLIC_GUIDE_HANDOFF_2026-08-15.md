# Handoff — Infinite Canvas public guide and comparison

## Result

- Objective achieved: a first-time visitor can learn the product and inspect a fair competitor map inside the existing Guide dialog.
- Current state: EN/JA Start Here, How to Use, and Compare tabs are implemented without changing the canvas-first product layout.
- Auditor decision: GO, pending the normal commit/push/public-response verification recorded at delivery.

## Changed files

| Path | Purpose |
|---|---|
| `public/eliora/infinite-canvas.html` | Responsive Guide UI, detailed operation instructions, comparison position map and matrix |
| `scripts/test-infinite-canvas-contract.mjs` | Guide/source/claim regression checks |
| `docs/INFINITE_CANVAS_PUBLIC_GUIDE_BRIEF_2026-08-15.md` | Objective, constraints, source list, acceptance criteria |
| `docs/INFINITE_CANVAS_PUBLIC_GUIDE_HANDOFF_2026-08-15.md` | Verification and continuation record |

## Verification

- Official repository README material checked for all six requested projects on 2026-08-15.
- Contract test: inline JavaScript, three guide sections, launch instructions, purpose-map language, and all repository links passed.
- Full Astro build: passed.
- Desktop browser: 5 start steps, 7 detailed sections, 18 shortcuts, 7 comparison rows, and 6 external source links rendered; no console warnings/errors.
- Japanese switch: heading, three tabs, matrix, and honest conclusion changed to JA while preserving one-language-at-a-time display.
- Mobile 390×844: document 390/390 px; Guide 374/374 px; only the matrix scroller expands internally (345 px viewport / 980 px table), so no page or dialog horizontal overflow.

## Decisions

- Preserved: logo, background, canvas, controls, English-first default, local-first rules, existing onboarding.
- Changed intentionally: top Help label is now Guide / 使い方; its dialog is larger and tabbed.
- Rejected: a blanket “Eliora beats everything” claim. The comparison instead states Eliora’s lead for its declared workflow target and names specialist strengths elsewhere.

## Source basis

- `basketikun/infinite-canvas`: AI image workspace, OpenAI-compatible APIs, local Agent, plugins, browser/Docker paths.
- `hero8152/Infinite-Canvas`: LAN ComfyUI, workflow JSON, multiple API families, smart/node canvases; some documented routes are China-platform specific.
- `serge-rgb/milton`: persistent infinite-detail painting and unlimited undo.
- `lkwq007/stablediffusion-infinity`: Stable Diffusion outpainting with documented browser/RAM and web-asset constraints.
- `obsidianmd/jsoncanvas`: open `.canvas` format for longevity, interoperability, and ownership; not a renderer.
- `xiaoiver/infinite-canvas-tutorial`: WebGL/WebGPU/ECS/tile rendering and advanced editor lessons; primarily an engineering tutorial.
