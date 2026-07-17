# Eliora Media Vault

Eliora Media Vault turns locally generated media into durable, inspectable records:

```text
ComfyUI or existing asset
  -> Genblaze Pipeline
  -> SHA-256 provenance manifest
  -> Backblaze B2 asset + manifest
  -> searchable public catalog
```

The public experience is designed for creators who generate on their own GPU but still need reliable search, provenance, recovery, and storage.

## Submitted release scope

The submitted working release is image-first. It proves the production core: local ComfyUI or existing-file ingestion, a real Genblaze run, SHA-256 provenance, a canonical manifest, private encrypted B2 storage, and a searchable public catalog with browser-side verification. Multimodal generation, thumbnails, semantic indexes, team review, and automated retry/evaluation are documented next-stage extensions rather than claims about the current release.

## What is real

- The pipeline uses `genblaze-core` rather than a hand-written JSON imitation.
- B2 storage uses `genblaze-s3` and `S3StorageBackend.for_backblaze`.
- Browser verification recomputes the asset SHA-256 and compares it with the Genblaze manifest.
- No B2 or provider secret is placed in browser code.
- The offline path is reproducible without a GPU or cloud account.

## Quickstart: no API keys

Python 3.11 or newer is required.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e ".[dev]"
eliora-vault run --asset path\to\generated.png --prompt "A coastal city at dusk"
pytest
```

Artifacts are written to `artifacts/<run-id>/`:

- `manifest.json`: canonical Genblaze provenance
- `catalog-item.json`: browser-safe catalog record
- `run-summary.json`: compact operational evidence

## Run with Backblaze B2

Use a bucket-scoped application key with `readFiles` and `writeFiles`. Credentials stay in process environment variables or an ignored local `.env` file.

Copy `.env.example` to `.env`, then fill in the key ID, application key, and exact bucket name. `B2_REGION` is optional: when blank, the CLI securely discovers `s3ApiUrl` through Backblaze `b2_authorize_account`. Never commit `.env`.

```powershell
$env:B2_KEY_ID = "..."
$env:B2_APP_KEY = "..."
$env:B2_BUCKET = "your-bucket"
$env:B2_REGION = "us-west-004"
eliora-vault run --asset path\to\generated.png --prompt "A coastal city at dusk" --b2
```

The B2 path uses a Genblaze `ObjectStorageSink` with hierarchical run storage. The sink uploads the asset and canonical manifest, rewrites the asset URL to its durable B2 URL, and records the manifest URI. It does not silently change bucket lifecycle rules.

After at least one verified B2 run, export credential-safe fields to the static site:

```powershell
eliora-vault export-site `
  --run-dir artifacts\<run-id> `
  --site-dir path\to\public\eliora\media-vault
```

The exporter rejects local-only runs, preventing the public UI from claiming a B2 proof that does not exist. It also creates a public provenance projection that removes workstation paths while retaining the original canonical hash and B2 manifest URI.

## Run a ComfyUI API workflow

Export the workflow in ComfyUI API format. If a positive-prompt node is supplied, its `inputs.text` value is replaced before submission.

```powershell
eliora-vault run `
  --workflow workflow-api.json `
  --prompt-node 6 `
  --prompt "A durable archive floating above a moonlit ocean" `
  --comfy-url http://127.0.0.1:8188
```

If ComfyUI is unavailable, pass `--asset` as a safe existing-file fallback:

```powershell
eliora-vault run --workflow workflow-api.json --asset fallback.png --prompt "..."
```

## Providers and models

- Primary generation provider: local ComfyUI API (`comfyui-local`).
- Primary proof model: `Krea2/krea2_turbo_bf16.safetensors` for the Provenance Chamber and Recovery Beacon records.
- Foundation proof asset: legacy local SDXL output, ingested through the same Genblaze provenance pipeline.
- Offline fallback: `existing-file-ingest` records an approved existing asset without claiming a new generation.
- Orchestration and provenance: `genblaze-core` 0.3.4+ (latest PyPI release; verified against current upstream source).
- Durable storage: `genblaze-s3` 0.3.4+ on Backblaze B2.

The CLI records provider, model, prompt, seed, dimensions, byte size, SHA-256, run state, and canonical manifest hash. It does not invent cloud success when B2 credentials are absent.

## Repository layout

```text
src/eliora_media_vault/
  cli.py          command-line entry point
  comfyui.py      ComfyUI API client
  pipeline.py     Genblaze pipeline and B2 sink
  providers.py    local ComfyUI/existing-asset provider
tests/
  test_pipeline.py
```

## Public evidence

- Working app: https://miragea-ss.github.io/eliora/media-vault/
- Demo video: https://miragea-ss.github.io/eliora/media-vault/demo.mp4?v=20260718-final
- Three-record catalog: https://miragea-ss.github.io/eliora/media-vault/sample_catalog.json
- Credential-safe B2 proof: https://miragea-ss.github.io/eliora/media-vault/b2-proof.json

The public catalog uses same-origin display copies because the encrypted production B2 bucket is intentionally private. Every record retains its B2 asset URI, B2 manifest URI, run ID, canonical manifest hash, and asset SHA-256. Browser verification recomputes the displayed asset hash; no B2 credential or local workstation path is exposed.

## Submission status

The implementation, three B2-backed records, public app, source, and final 1080p demo are complete. See `DEVPOST_SUBMISSION.md` for paste-ready Devpost copy and `SUBMISSION_CHECKLIST.md` for the remaining user-controlled submission steps.

## License

The Eliora Media Vault project is released under the MIT License. See `LICENSE`.
