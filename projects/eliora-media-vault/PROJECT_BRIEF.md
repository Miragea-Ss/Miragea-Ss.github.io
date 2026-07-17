# Project Brief

## Identity

- Project: Eliora Media Vault — winning submission completion
- Date: 2026-07-17
- Requested by: Miragea creative director
- Source of truth: `F:\Astro\miragea-space`, the live GitHub Pages site, verified Backblaze B2 run data, and official hackathon requirements
- Separate working directory: `H:\Codex\New＿start\eliora-media-vault-winning-submission-2026-07-17`

## Objective

- User outcome: submit a credible winning-class Genblaze + Backblaze B2 media application by 2026-07-30 JST.
- Audience: hackathon judges first; local-first AI creators and creative teams second.
- Why this matters now: the working proof is public, but one asset and a 720p demo do not yet demonstrate enough orchestration depth or production breadth.

## Deliverables

- A public vault containing at least three coherent media records.
- A real Genblaze run and B2 asset/manifest pair for every displayed record.
- Honest provider/model/source metadata and browser-side SHA-256 verification.
- A polished responsive judge path showing utility, recovery, B2 layout, and provenance.
- A final 1920x1080, approximately three-minute demo video.
- Final Devpost copy, public repository instructions, evidence checklist, and handoff.
- Language/market: English-first submission and judge UI; internal handoff may be Japanese.

## Constraints

- Preserve the approved Eliora Media Vault identity, current public URL, and existing video until its replacement is verified.
- Do not commit `.env`, keys, local artifacts, or other agents' files.
- Preserve `agents/campaign-identity.md` and remote automation updates.
- Use the actual repository at `F:\Astro\miragea-space`; stage changes first in the dated H workspace when practical.
- Prefer local ComfyUI generation, real Genblaze Pipeline execution, Backblaze B2 storage, and reproducible tests.
- Safety deadline: fully submitted by 2026-07-30 JST. Official deadline: 2026-08-03 17:00 EDT / 2026-08-04 06:00 JST.

## Acceptance Criteria

1. At least three displayed assets have verified B2 storage, non-null manifest URIs, canonical hashes, and matching browser-recomputed SHA-256 values.
2. The source demonstrates a real Genblaze Pipeline, local ComfyUI API execution, existing-file fallback, region discovery, and credential-safe B2 export.
3. The judge can understand the problem, pipeline, fallback behavior, B2 structure, and proof within three minutes.
4. Desktop and mobile layouts load all media without private-B2 403 errors, overlap, or clipped controls.
5. Automated tests and the Astro production build pass; the public deployment is rechecked after approval.
6. Final video is 1920x1080, approximately three minutes, readable, audible, and shows the actual live workflow.
7. Devpost requirements are complete and every claim is supported by public evidence.

## Approval Boundary

- Local work allowed: research, generation, B2 runs using the already approved bucket key, code, tests, builds, screenshots, video drafts, and documentation.
- Must ask before: new git push/public deployment and final Devpost submission.
- User-only actions: passwords, verification codes, identity information, billing, and final contest agreement acceptance.

## Assigned Roles

- Manager: sequence and scope control.
- Research: current judging criteria and local source audit.
- Design: coherent three-asset collection and judge path.
- Coding: Genblaze/B2 pipeline, catalog, responsive UI, and automation.
- Testing: pipeline, B2, browser, mobile, video, and regression verification.
- Documentation: README, Devpost package, demo script, and handoff.
- Auditor: final traceability and publish boundary.

## Decisions And Corrections

| Time | Decision/correction | Effect on plan |
|---|---|---|
| 2026-07-17 | User requires certain completion by July 30. | Internal schedule ends July 30, not official deadline day. |
| 2026-07-17 | Existing B2 bucket and application key confirmed. | Use the established private bucket; never expose secrets. |
| 2026-07-17 | First real B2 run and public proof completed. | Build additional records on the verified path instead of replacing it. |
| 2026-07-17 | Continue all winning tasks. | Proceed locally until the next publish/submission approval boundary. |
