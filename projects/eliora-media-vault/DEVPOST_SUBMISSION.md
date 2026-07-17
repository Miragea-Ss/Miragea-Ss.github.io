# Devpost Submission — Final Copy

Updated: 2026-07-18 JST

## Project name

Eliora Media Vault

## Tagline

Generate locally. Prove every asset. Preserve it on Backblaze B2.

## Working links

- Working app: https://miragea-ss.github.io/eliora/media-vault/
- Public source: https://github.com/Miragea-Ss/Miragea-Ss.github.io/tree/main/projects/eliora-media-vault
- Demo video: https://miragea-ss.github.io/eliora/media-vault/demo.mp4?v=20260718-final
- Judge-safe B2 proof: https://miragea-ss.github.io/eliora/media-vault/b2-proof.json
- Public catalog: https://miragea-ss.github.io/eliora/media-vault/sample_catalog.json

## Inspiration

AI creators often generate locally because their workflows depend on custom ComfyUI graphs, private checkpoints, large files, and powerful GPUs. The result is a familiar production failure: final images and videos scatter across folders, prompts and model history disappear, and nobody can reliably prove which file belongs to which run.

Eliora Media Vault keeps local generation local while turning every approved output into a durable, searchable, cryptographically verifiable media record.

## What it does

1. Runs a ComfyUI API workflow or safely ingests an existing generated asset.
2. Executes the operation through a real Genblaze Pipeline.
3. Records provider, model, prompt, seed, dimensions, byte size, run state, and SHA-256 in a canonical provenance manifest.
4. Stores the asset and manifest on Backblaze B2 through `genblaze-s3`.
5. Exports a credential-safe catalog for the public Media Vault.
6. Lets a judge recompute each asset SHA-256 in the browser and compare it with the Genblaze record.
7. Preserves the exact prompt, model, seed, source, and run history needed to recover only a failed production step.

## How we built it

- Local generation: ComfyUI on an RTX PRO 6000 workstation.
- Orchestration and provenance: `genblaze-core` Pipeline and canonical manifests.
- Durable storage: `genblaze-s3`, `S3StorageBackend.for_backblaze`, and hierarchical run storage.
- Public experience: dependency-free HTML, CSS, and JavaScript hosted through GitHub Pages.
- Reliability: existing-file fallback when ComfyUI is unavailable, offline tests, explicit B2 proof export, and browser-side hash verification.

## How Backblaze B2 is used

B2 is the durable system of record, not a final-file dump. Each verified run stores generated media and its Genblaze provenance manifest under a date- and run-scoped hierarchy:

`eliora-vault/runs/YYYY-MM-DD/<run-id>/assets/<asset-id>.<ext>`

`eliora-vault/runs/YYYY-MM-DD/<run-id>/manifest.json`

The bucket remains private and encrypted with SSE-B2. The public app receives only credential-safe metadata, local display copies, cryptographic hashes, and durable B2 references; application keys and workstation paths never enter browser code. The proof exporter rejects local-only runs, so the public UI cannot claim B2 evidence unless a real credentialed B2 run completed.

The current catalog contains three completed B2-backed records, three canonical manifests, three SHA-256 values, and three durable B2 asset/manifest URI pairs.

## How Genblaze is used

Genblaze is the orchestration and provenance boundary. A custom synchronous provider connects local ComfyUI and existing-file ingestion to the Genblaze Pipeline API. Genblaze produces the canonical run manifest; the B2 object storage sink persists both media and lineage. The application uses run status, step status, hashes, manifest URIs, and storage transfer results as acceptance gates instead of treating an uploaded file as sufficient proof.

## Providers and models

- `comfyui-local`: local ComfyUI API provider.
- `Krea2/krea2_turbo_bf16.safetensors`: primary model for the Provenance Chamber and Recovery Beacon proof assets.
- Legacy local SDXL checkpoint: foundation proof asset, ingested through the same Genblaze provenance pipeline.
- `existing-file-ingest`: resilience path when ComfyUI is unavailable; it records and stores an existing approved asset without pretending a new generation occurred.
- `genblaze-core` 0.3.4+ for pipeline orchestration and canonical provenance.
- `genblaze-s3` 0.3.4+ for Backblaze B2 object storage.

## Challenges

The main challenge was connecting a local, GPU-heavy creator workflow to a public judge experience without exposing secrets or pretending that a static demo was a cloud pipeline. We separated credentialed execution from the browser catalog, then made the boundary independently inspectable through SHA-256 values, canonical manifests, run IDs, and B2 object references.

## Accomplishments

- Three real, completed, B2-backed media records with public judge-safe manifests.
- Real ComfyUI API execution plus an honest existing-asset fallback.
- Genblaze canonical manifests and browser-side asset verification.
- B2-only proof export that prevents misleading public claims.
- A reproducible no-key path for judges and a credentialed path for operators.
- A focused judge experience explaining utility, architecture, evidence, recovery, and delivery.

## What we learned

For generative media, the durable product is not only the final image or video. It is the asset plus its lineage, integrity record, storage location, and recovery path.

## What's next

- Multi-provider generation and automated evaluation/retry policies.
- Backblaze Object Lock retention for high-value provenance manifests.
- Automatic thumbnails and semantic search indexes.
- Team review queues and role-based access.
- C2PA signing for additional authenticity and trust workflows.

## Suggested Devpost gallery captions

1. **The working Media Vault** — Three production assets with prompts, models, run state, B2 storage status, and in-browser SHA-256 verification.
2. **Prompt to durable memory** — ComfyUI generation flows through Genblaze provenance into a run-scoped Backblaze B2 object hierarchy.
3. **Recover the failed step, not the whole production** — Prompt, seed, model, source asset, and canonical manifest remain available for targeted rebuilds.
