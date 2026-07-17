# Eliora Media Vault — Acceptance & Handoff

Updated: 2026-07-18 JST

Submission safety deadline: 2026-07-30 JST

Official deadline: 2026-08-03 17:00 EDT / 2026-08-04 06:00 JST

## Auditor decision

**GO FOR FINAL LOCAL REVIEW — PUBLICATION APPROVAL REQUIRED**

The working application, real Genblaze implementation, three records in the new encrypted B2 bucket, final 1080p demo, and credential-safe public projections are complete locally. Publication, final public verification, Devpost agreement acceptance, and Submit remain under the creative director's control.

## Accepted evidence

- [x] Real Genblaze `Pipeline` implementation exists.
- [x] Local ComfyUI API provider and honest existing-file fallback exist.
- [x] Asset SHA-256, dimensions, MIME type, byte size, run state, and canonical manifests are produced.
- [x] Backblaze B2 sink uses `S3StorageBackend.for_backblaze` and `ObjectStorageSink`.
- [x] The public proof exporter refuses to present local-only output as B2 evidence.
- [x] Three completed vault records have B2 asset and manifest URIs.
- [x] Provenance Chamber and Recovery Beacon were executed through the live ComfyUI API on RTX PRO 6000 Blackwell hardware.
- [x] All three final records point to the private encrypted `eliora-media-vault-20260717` bucket.
- [x] Public provenance projections remove workstation paths while retaining canonical hashes and B2 source URIs.
- [x] Nine automated tests pass.
- [x] Astro production build completes (70 pages).
- [x] Browser-side SHA-256 verification matches the stored asset hashes.
- [x] Final demo is 1920×1080, 30 fps, H.264/AAC, 03:05.458, and fully decodes.
- [x] No long freeze, black-frame event, or long silence was detected in the final demo.
- [x] Existing public app, source, and final video resolve.
- [ ] New-bucket catalog and proof JSON require approved push and public re-verification.
- [x] Release commit `590415e5361e5a46508efa3befe9a5f6589965bc` was pushed with user approval.

## Source locations

- Working source: `F:\Astro\miragea-space\projects\eliora-media-vault`
- Public page source: `F:\Astro\miragea-space\public\eliora\media-vault`
- Safe continuation workspace: `H:\Codex\New＿start\eliora-media-vault-winning-submission-2026-07-17`
- Final upload video: `H:\Codex\New＿start\Elora-v-1080p30-upload.mp4`
- Live app: https://miragea-ss.github.io/eliora/media-vault/
- Direct video: https://miragea-ss.github.io/eliora/media-vault/demo.mp4?v=20260718-final
- Public source: https://github.com/Miragea-Ss/Miragea-Ss.github.io/tree/main/projects/eliora-media-vault

## B2-backed records

Bucket: `eliora-media-vault-20260717` (Private, SSE-B2 enabled, Keep all versions)

1. Foundation run: `fa9a0147-f003-4e25-a937-d934bb13cab1`
   - SHA-256: `a2674f5cbf543ee287bb5c737c1ffa61f6c913cb358f1687d8425b329c01aeff`
   - Canonical hash: `29e6a0398f575755df447194a3eb66395fa73759d63fc6a8ee4964d38dee35a1`
2. Provenance Chamber run: `9bdcab2b-994e-48a4-b464-705365c12953`
   - Pipeline model: `comfyui-api`
   - SHA-256: `cc58f79d7289d186dd4f1a72b42fb55768d0f302e93f35148cce8a7b9b3dd021`
   - Canonical hash: `d8212ef4ad8951277093e3d563d16a10f8da359a2cd6b78f264ddd60ecd9d300`
3. Recovery Beacon run: `b0e0f1c9-c623-4732-b4c3-f7613b1c209c`
   - Pipeline model: `comfyui-api`
   - SHA-256: `dc97affc10ea6dc101426f044174fee8509c0de5a679bd309b74261d02a3a9bb`
   - Canonical hash: `6ca14ced51b9d5e82db6d063fdc1fc3d56fd226e41014a36357ab32d073b47a9`

The B2 bucket is private by design. Public assets are same-origin display copies. Public provenance projections expose hashes and durable B2 references but remove local source, workflow, output, and service paths. Credentials never enter the browser.

## Video acceptance

- Local file size: 84,123,421 bytes (80.23 MiB).
- SHA-256: `6EC8D98A3E132769A789E3797DB17B6D711E96F06ACC14FA3101775AC5A843E2`.
- Audio: approximately -16.4 LUFS integrated, -1.5 dBTP, stereo AAC at 48 kHz.
- The video shows the problem, product, ComfyUI flow, provenance, Genblaze/B2 architecture, B2 object organization, recovery, delivery, URL, and QR code.

## Remaining user-controlled actions

1. Review the local desktop and mobile build.
2. Approve the Eliora-only commit and push.
3. Re-verify the deployed app, JSON records, asset hashes, source, and video while logged out.
4. Open the Devpost project editor while logged in.
5. Paste the fields from `DEVPOST_SUBMISSION.md`.
6. Add 3–5 screenshots using the prepared gallery captions.
7. Personally accept the contest agreements and click Submit.
8. Save the confirmation page or email.

## Protected work

The unrelated untracked file `F:\Astro\miragea-space\agents\campaign-identity.md` remains untouched and must not be staged with this project.
