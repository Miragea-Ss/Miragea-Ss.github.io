# Devpost Submission Draft

## Project name

Eliora Media Vault

## Tagline

Generate locally. Prove every asset. Preserve it on Backblaze B2.

## Inspiration

AI creators often generate locally because their workflows depend on custom ComfyUI graphs, private checkpoints, large files, and powerful GPUs. The result is a familiar production failure: final images and videos scatter across folders, the prompt and model history disappear, and nobody can prove which file belongs to which run.

Eliora Media Vault keeps local generation local while turning every approved output into a durable, searchable, cryptographically verifiable media record.

## What it does

1. Runs a ComfyUI API workflow or safely ingests an existing generated asset.
2. Executes the workflow through a real Genblaze Pipeline.
3. Records provider, model, prompt, seed, dimensions, size, run state, and SHA-256 in a canonical provenance manifest.
4. Stores the asset and manifest on Backblaze B2 through `genblaze-s3`.
5. Exports a credential-safe catalog for a public Media Vault.
6. Lets a judge recompute the asset SHA-256 in the browser and compare it with the Genblaze record.

## How we built it

- Local generation: ComfyUI on an RTX PRO 6000 workstation.
- Orchestration and provenance: `genblaze-core` Pipeline and canonical manifests.
- Durable storage: `genblaze-s3` with `S3StorageBackend.for_backblaze` and hierarchical run storage.
- Public experience: dependency-free HTML, CSS, and JavaScript hosted on GitHub Pages.
- Reliability: existing-file fallback when ComfyUI is unavailable, offline manifest tests, explicit B2 proof export, and browser-side hash verification.

## How Backblaze B2 is used

B2 is the durable system of record, not a final-file dump. Each verified run stores generated media and its Genblaze provenance manifest under a run-scoped hierarchy. The public site receives only durable references and judge-safe metadata; B2 application keys never enter the browser. A proof exporter refuses to publish local-only runs as B2 evidence.

## How Genblaze is used

Genblaze is the orchestration and provenance boundary. A custom `SyncProvider` connects local ComfyUI/existing-file generation to the Pipeline API. Pipeline fallback preserves useful work during a local service outage. Every successful run produces a canonical manifest whose output asset SHA-256 is required to verify.

## Challenges

The main challenge was connecting a local, GPU-heavy creator workflow to a public judge experience without exposing secrets or pretending that a static demo was a cloud pipeline. We separated the credentialed execution layer from the browser catalog, then made the boundary independently verifiable through hashes and manifests.

## Accomplishments

- Reproducible offline path with no GPU or cloud account.
- Real ComfyUI API path with existing-asset fallback.
- Genblaze canonical manifests and browser-side asset verification.
- B2-only proof exporter that prevents misleading public claims.
- A focused judge path that explains utility, architecture, evidence, and recovery.

## What we learned

For generative media, the durable product is not only the final image or video. It is the asset plus its lineage, integrity record, storage location, and recovery path.

## What's next

- Multi-provider generation and evaluation.
- Object Lock retention for high-value provenance manifests.
- Automatic thumbnails and semantic search indexes.
- Team review queues and role-based access.
- C2PA signing for adversarial trust scenarios.

## Providers and models

- `comfyui-local`: SDXL local checkpoint (`青禾SDXL-幻想引擎 V2.0 暗房影真`) for the primary proof asset.
- `existing-file-ingest`: no-generation fallback through the same Genblaze Pipeline.
- `genblaze-core` 0.3.4+.
- `genblaze-s3` 0.3.4+ with Backblaze B2.

## Links to finalize

- Working app: https://miragea-ss.github.io/eliora/media-vault/
- GitHub source: https://github.com/Miragea-Ss/Miragea-Ss.github.io/tree/main/projects/eliora-media-vault
- Demo video: add final public video URL
- B2 manifest proof: add final durable manifest URI

