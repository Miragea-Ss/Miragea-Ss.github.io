# Project Brief

## Identity

- Project: Eliora Media Vault — winning submission completion
- Date: 2026-07-17
- Source of truth: the public Media Vault, the `F:\Astro\miragea-space` repository, and Backblaze's official Genblaze documentation
- Safety deadline: submission fully completed by 2026-07-30 (official deadline: 2026-08-03 17:00 EDT)

## Objective

Turn the current attractive static proof into a reproducible, production-minded Genblaze + Backblaze B2 media workflow that judges can inspect, run, and verify.

## Acceptance Criteria

1. A real Genblaze `Pipeline` creates a SHA-256-verifiable provenance manifest.
2. The same pipeline can ingest an existing ComfyUI output or execute a ComfyUI API workflow.
3. A Backblaze B2 sink is enabled with environment variables and never exposes credentials in the browser.
4. The no-credential path runs offline and is covered by tests.
5. A generated catalog can drive the public static site.
6. The public site, repository documentation, and final demo video show the same verified workflow.

## Approval Boundary

- Allowed now: local implementation, tests, builds, screenshots, video drafts, documentation.
- Confirm before: Git push, public deployment, Devpost submission, credential entry, external upload.

