# Project Brief

## Identity

- Project: Eliora Infinite Canvas next-stage completion
- Date: 2026-08-15
- Requested by: Miragea creative director
- Source of truth: `public/eliora/infinite-canvas.html`
- Separate working directory: `H:\Codex\miragea-media-portrait-2026-08-15\repo`

## Objective

- User outcome: A clean, understandable, local-first Infinite Canvas that tracks current ComfyUI capabilities, stays responsive on large boards, and is safely operable by AI agents.
- Audience: Global creators and operators using local ComfyUI, llama.cpp, international BYOK APIs, Codex, Claude, or open-protocol agents.
- Why this matters now: Eliora must exceed feature demos by being practical, durable, and safe without Chinese real-name-verification dependencies.

## Deliverables

- Runtime ComfyUI capability discovery from `/object_info`.
- Large-board viewport virtualization with selected/connected-node safety.
- Expanded Agent operation validation, permission scope, proposal preview, and audit history.
- Automated contract and performance checks.
- Build, browser QA, commit, and push to `origin/main` after GO.
- Languages: English and Japanese UI; connector policy is global.

## Constraints

- Preserve exactly: Miragea/Eliora visual identity, local-first default, existing board data compatibility, JSON passthrough, OpenRouter/BYOK, ComfyUI, llama.cpp, review-required Agent writes.
- Do not touch: `F:\Astro`, `H:\Grok`, Chinese real-name-required services, unrelated site pages.
- Tools/frameworks: Existing static HTML/CSS/JavaScript and Astro build.
- Sequence: implement locally, focused tests, build, desktop visual QA, audit, commit, push.

## Acceptance Criteria

1. Capability discovery classifies live ComfyUI nodes without a fixed model-generation list and degrades cleanly when offline.
2. Boards above the virtualization threshold render only nearby nodes while selected and connected context stays present; small boards behave exactly as before.
3. Agent proposals reject unknown or dangerous operations, enforce bounded batch size and permission scope, show a readable preview, and create a local audit record.
4. Contract tests, build, `git diff --check`, and browser console checks pass.
5. No China real-name dependency or unreviewed Agent write path is introduced.

## Approval Boundary

- Local work allowed: implementation, tests, build, browser QA, documentation, commit.
- Push allowed: explicitly approved by the user after completion.
- User-only actions: passwords, verification, payment, identity information.

## Assigned Roles

- Manager: Codex
- Design: interaction hierarchy and clean status presentation
- Coding: runtime discovery, virtualization, Agent policy
- Testing: contract, performance, build, browser regression
- Auditor: final requirement and safety check

## Decisions And Corrections

| Time | Decision/correction | Effect on plan |
|---|---|---|
| 2026-08-15 | Stable Diffusion-specific parity is not a goal | Use capability probing and current ComfyUI graphs instead of fixed legacy recipes |
| 2026-08-15 | “好用、好理解、整洁漂亮” is the UI standard | Advanced detail stays secondary; primary canvas remains calm |
