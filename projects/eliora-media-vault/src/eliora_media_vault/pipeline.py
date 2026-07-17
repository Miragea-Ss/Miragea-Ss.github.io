"""Genblaze orchestration, provenance export, and optional B2 storage."""

from __future__ import annotations

import json
import os
import base64
import re
import tempfile
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from genblaze_core import KeyStrategy, Modality, ObjectStorageSink, Pipeline
from genblaze_s3 import S3StorageBackend

from .providers import ComfyUILocalProvider


@dataclass(frozen=True)
class VaultRunConfig:
    prompt: str
    asset: Path | None = None
    workflow: Path | None = None
    prompt_node: str | None = None
    comfy_url: str = "http://127.0.0.1:8188"
    checkpoint: str = "operator-recorded-local-checkpoint"
    seed: int | None = None
    output_root: Path = Path("artifacts")
    use_b2: bool = False


def _region_from_s3_api_url(s3_api_url: str) -> str:
    match = re.fullmatch(
        r"https?://s3\.([a-z0-9-]+)\.backblazeb2\.com/?", s3_api_url.strip()
    )
    if not match:
        raise RuntimeError("Backblaze returned an unrecognized S3 API URL")
    return match.group(1)


def _discover_b2_region(key_id: str, app_key: str) -> str:
    credentials = base64.b64encode(f"{key_id}:{app_key}".encode("utf-8")).decode("ascii")
    request = Request(
        "https://api.backblazeb2.com/b2api/v4/b2_authorize_account",
        headers={"Authorization": f"Basic {credentials}"},
    )
    try:
        with urlopen(request, timeout=20) as response:
            payload = json.load(response)
    except (HTTPError, URLError, TimeoutError) as error:
        raise RuntimeError(
            "Could not authorize the B2 application key to discover its region"
        ) from error
    try:
        s3_api_url = payload["apiInfo"]["storageApi"]["s3ApiUrl"]
    except (KeyError, TypeError) as error:
        raise RuntimeError("Backblaze authorization response omitted s3ApiUrl") from error
    return _region_from_s3_api_url(s3_api_url)


def _b2_sink() -> ObjectStorageSink:
    bucket = os.environ.get("B2_BUCKET")
    if not bucket:
        raise RuntimeError("B2_BUCKET is required with --b2")
    key_id = os.environ.get("B2_KEY_ID")
    app_key = os.environ.get("B2_APP_KEY")
    if not key_id or not app_key:
        raise RuntimeError("B2_KEY_ID and B2_APP_KEY are required with --b2")
    region = os.environ.get("B2_REGION") or _discover_b2_region(key_id, app_key)
    backend = S3StorageBackend.for_backblaze(
        bucket,
        region=region,
        key_id=key_id,
        app_key=app_key,
        auto_lifecycle=False,
    )
    return ObjectStorageSink(backend, prefix="eliora-vault", key_strategy=KeyStrategy.HIERARCHICAL)


def _catalog_item(result: Any, config: VaultRunConfig) -> dict[str, Any]:
    step = result.run.steps[0]
    asset = step.assets[0]
    return {
        "id": asset.asset_id,
        "name": Path(asset.url).name or "Eliora generated asset",
        "prompt": config.prompt,
        "provider": step.provider,
        "model": config.checkpoint,
        "pipeline_model": step.model,
        "run_id": result.run.run_id,
        "run_status": str(result.run.status),
        "step_status": str(step.status),
        "asset_url": asset.url,
        "manifest_url": result.manifest.manifest_uri,
        "sha256": asset.sha256,
        "canonical_hash": result.manifest.canonical_hash,
        "size_bytes": asset.size_bytes,
        "width": asset.width,
        "height": asset.height,
        "seed": config.seed,
        "verified": bool(result.manifest.verify()),
        "storage": "backblaze-b2" if config.use_b2 else "local-artifact",
    }


def run_vault(config: VaultRunConfig) -> Path:
    if not config.workflow and not config.asset:
        raise ValueError("Provide either an existing --asset or a ComfyUI --workflow")

    model = "comfyui-api" if config.workflow else "existing-file-ingest"
    generated_dir = (
        Path(tempfile.gettempdir()) / "eliora-media-vault" / "generated"
        if config.use_b2
        else config.output_root / "generated"
    )
    params = {
        "source_path": str(config.asset) if config.asset else None,
        "workflow_path": str(config.workflow) if config.workflow else None,
        "prompt_node": config.prompt_node,
        "comfy_url": config.comfy_url,
        "output_dir": str(generated_dir),
    }
    pipeline = Pipeline("eliora-media-vault").step(
        ComfyUILocalProvider(),
        model=model,
        prompt=config.prompt,
        modality=Modality.IMAGE,
        fallback_models=["existing-file-ingest"] if config.workflow and config.asset else None,
        metadata={"product": "Eliora Media Vault", "checkpoint": config.checkpoint},
        seed=config.seed,
        **params,
    )
    result = pipeline.run(
        sink=_b2_sink() if config.use_b2 else None,
        timeout=660,
        raise_on_failure=True,
    )
    if not result.run.steps or not result.run.steps[0].assets:
        summary = result.error_summary() or "pipeline produced no asset"
        raise RuntimeError(summary)
    if not result.manifest.verify():
        raise RuntimeError("Genblaze manifest verification failed")

    run_dir = config.output_root / result.run.run_id
    run_dir.mkdir(parents=True, exist_ok=True)
    (run_dir / "manifest.json").write_text(
        result.manifest.model_dump_json(indent=2), encoding="utf-8"
    )
    catalog_item = _catalog_item(result, config)
    (run_dir / "catalog-item.json").write_text(
        json.dumps(catalog_item, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    summary = {
        "pipeline": "eliora-media-vault",
        "run_id": result.run.run_id,
        "verified": True,
        "asset_sha256": catalog_item["sha256"],
        "manifest_hash": catalog_item["canonical_hash"],
        "manifest_uri": result.manifest.manifest_uri,
        "storage": catalog_item["storage"],
    }
    (run_dir / "run-summary.json").write_text(
        json.dumps(summary, indent=2), encoding="utf-8"
    )
    return run_dir
