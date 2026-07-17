# Final Demo Script — target 2:45 to 2:55

Do not record this final version until the B2 proof is live and the public build is updated.

## 00:00–00:18 — Problem

Show scattered generated files, then the Media Vault hero.

Narration: “Local AI creators can generate extraordinary media, but the output quickly loses its history. Which prompt, model, seed, and run created the final file—and can anyone verify it later?”

## 00:18–00:42 — Product value

Show the public catalog and provenance inspector.

Narration: “Eliora Media Vault keeps the local production workflow while turning each approved asset into a searchable, verifiable record.”

## 00:42–01:12 — Real pipeline

Show the repository source: `Pipeline`, `ComfyUILocalProvider`, and B2 sink. Keep code readable.

Narration: “A real Genblaze Pipeline runs a ComfyUI API workflow or ingests an existing output. It records the provider, checkpoint, prompt, seed, dimensions, size, status, and SHA-256.”

## 01:12–01:38 — Reliability

Show the test for ComfyUI outage fallback and the three passing tests.

Narration: “If ComfyUI is unavailable, the pipeline can preserve useful work through existing-file fallback. Offline tests prove that the manifest remains valid without a GPU or cloud account.”

## 01:38–02:05 — B2 orchestration

Show the successful CLI run, durable asset URL, manifest URI, and B2 proof status on the public site.

Narration: “Genblaze-s3 stores the asset and canonical manifest on Backblaze B2. Credentials stay in the local execution layer; the browser receives only durable references and judge-safe metadata.”

## 02:05–02:30 — Independent verification

Click “Verify selected asset.” Show the green result and open the manifest JSON.

Narration: “The judge can recompute SHA-256 directly in the browser and compare the asset bytes with the Genblaze provenance record.”

## 02:30–02:50 — Utility and close

Show the reliability section and creator use cases.

Narration: “This is durable media memory for local-first creators: generate locally, prove every asset, and preserve it on B2.”

End card: working app URL, GitHub source, Genblaze + Backblaze B2.

