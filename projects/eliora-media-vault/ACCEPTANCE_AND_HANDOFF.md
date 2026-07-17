# Eliora Media Vault — Acceptance & Handoff

Updated: 2026-07-17 JST  
Submission safety deadline: 2026-07-30 JST  
Official deadline: 2026-08-03 17:00 EDT (2026-08-04 06:00 JST)

## Current acceptance status

- [x] Real Genblaze `Pipeline` implementation exists.
- [x] Local ComfyUI provider and existing-file fallback exist.
- [x] Asset SHA-256, dimensions, MIME type, size, and canonical manifest are produced.
- [x] Optional Backblaze B2 sink uses `S3StorageBackend.for_backblaze` and `ObjectStorageSink`.
- [x] The public-site proof exporter refuses to present local-only output as B2 evidence.
- [x] Four automated tests pass.
- [x] Astro production build completes (70 pages).
- [x] Built media-vault page loads the 186.827-second 1280x720 demo.
- [x] Browser-side SHA-256 verification matches the manifest asset hash.
- [x] Devpost draft, final demo script, and submission checklist exist.
- [x] Credentialed B2 smoke run completed (`1d8bc92b-aed8-4a52-b7b0-11fe520a2181`).
- [x] `b2-proof.json` exported from a verified B2 run.
- [ ] At least three final vault assets generated/ingested and stored on B2.
- [ ] Final 1080p demo recorded after the real B2 proof is visible.
- [ ] Local changes reviewed, committed, pushed, and public URL reverified.
- [ ] Devpost entry submitted and confirmation captured.

## Source locations

- Working source: `F:\Astro\miragea-space\projects\eliora-media-vault`
- Public page source: `F:\Astro\miragea-space\public\eliora\media-vault`
- Safe continuation workspace: `H:\Codex\New＿start\eliora-media-vault-winning-submission-2026-07-17`
- Live URL: <https://miragea-ss.github.io/eliora/media-vault/>

## Credentialed B2 acceptance run

Completed 2026-07-17 JST against bucket `-miragea-genmedia-0710`.

- B2 asset: `eliora-vault/runs/2026-07-17/1d8bc92b-aed8-4a52-b7b0-11fe520a2181/assets/85bc4768-6acb-4c2e-bd54-a0d040f9f1bd.png` (718,678 bytes)
- B2 manifest: `eliora-vault/runs/2026-07-17/1d8bc92b-aed8-4a52-b7b0-11fe520a2181/manifest.json` (2,110 bytes)
- Asset SHA-256: `a2674f5cbf543ee287bb5c737c1ffa61f6c913cb358f1687d8425b329c01aeff`
- Manifest hash: `42efa7954ccb657418e0dea97bf9978cadca22694b448ab178753cd8ceab9b02`
- Public proof files were generated locally and verified in the production build. They still require commit/push approval.

Do not paste credentials into chat or commit them. Set these locally:

```powershell
$env:B2_KEY_ID = "..."
$env:B2_APP_KEY = "..."
$env:B2_BUCKET = "..."
$env:B2_REGION = "..."
```

From `F:\Astro\miragea-space\projects\eliora-media-vault`:

```powershell
.\.venv\Scripts\python.exe -m eliora_media_vault.cli run --input .\path\to\asset.png --prompt "..." --b2
.\.venv\Scripts\python.exe -m eliora_media_vault.cli export-site --run-dir .\artifacts\runs\RUN_ID --site-dir ..\..\public\eliora\media-vault
```

Acceptance evidence must include a non-null B2 manifest URI, verified asset hash, successful run status, and exported `b2-proof.json`. If any condition is absent, the site must continue to display the honest pending state.

## Internal schedule

- July 17–20: credentialed B2 run and proof export.
- July 21–24: expand to at least three strong media assets; polish catalog and judge path.
- July 25–27: record and edit the final 1080p, approximately three-minute demo.
- July 28: clean-machine rehearsal, repository/setup verification, Devpost draft freeze.
- July 29: submit to Devpost and save confirmation evidence.
- July 30: public URL, source link, video playback, and submission-state safety check.

## Publish boundary

The working tree has intentionally not been committed or pushed. Obtain the user's explicit approval immediately before commit/push/deployment and before final Devpost submission. Preserve unrelated files, including `agents/campaign-identity.md`.
