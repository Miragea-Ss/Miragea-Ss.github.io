"""Export credential-safe B2 run evidence for the static judge site."""

from __future__ import annotations

import json
import hashlib
import shutil
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


def _public_manifest_projection(source: Path, item: dict[str, Any]) -> dict[str, Any]:
    manifest = json.loads(source.read_text(encoding="utf-8"))
    run = manifest.get("run")
    if isinstance(run, dict):
        for step in run.get("steps", []):
            if not isinstance(step, dict):
                continue
            params = step.get("params")
            if not isinstance(params, dict):
                continue
            workflow_path = params.pop("workflow_path", None)
            source_path = params.pop("source_path", None)
            params.pop("output_dir", None)
            params.pop("comfy_url", None)
            if workflow_path:
                params["workflow_ref"] = Path(str(workflow_path)).name
            if source_path:
                params["source_ref"] = Path(str(source_path)).name
    manifest["public_projection"] = {
        "redacted": True,
        "source_manifest_uri": item["manifest_url"],
        "source_canonical_hash": item["canonical_hash"],
    }
    return manifest


def export_site(run_dirs: list[Path], site_dir: Path) -> tuple[Path, Path]:
    if not run_dirs:
        raise ValueError("At least one run directory is required")
    items: list[dict[str, Any]] = []
    for run_dir in run_dirs:
        item = json.loads((run_dir / "catalog-item.json").read_text(encoding="utf-8"))
        if item.get("storage") != "backblaze-b2":
            raise ValueError(f"Refusing to publish non-B2 proof from {run_dir}")
        if not item.get("verified") or not item.get("manifest_url"):
            raise ValueError(f"Run is not verified B2 evidence: {run_dir}")
        items.append(item)

    now = datetime.now(UTC).isoformat()
    site_dir.mkdir(parents=True, exist_ok=True)
    public_items: list[dict[str, Any]] = []
    for index, (run_dir, item) in enumerate(zip(run_dirs, items, strict=True)):
        public_item = dict(item)
        asset_name = "sample_asset.png" if index == 0 else f"vault_asset_{index + 1:02d}.png"
        manifest_name = "sample_manifest.json" if index == 0 else f"vault_manifest_{index + 1:02d}.json"
        public_mirror = site_dir / asset_name
        source_mirror = run_dir / "asset.png"
        if source_mirror.is_file():
            source_hash = hashlib.sha256(source_mirror.read_bytes()).hexdigest()
            if source_hash != item["sha256"]:
                raise ValueError(f"Run asset mirror does not match verified B2 asset: {run_dir}")
            shutil.copy2(source_mirror, public_mirror)
        if public_mirror.is_file():
            mirror_hash = hashlib.sha256(public_mirror.read_bytes()).hexdigest()
            if mirror_hash != item["sha256"]:
                raise ValueError(f"Public mirror does not match verified B2 asset: {public_mirror}")
            public_item["b2_asset_url"] = item["asset_url"]
            public_item["b2_manifest_url"] = item["manifest_url"]
            public_item["asset_url"] = f"./{asset_name}"
            public_item["manifest_url"] = f"./{manifest_name}"
            source_manifest = run_dir / "manifest.json"
            if source_manifest.is_file():
                public_manifest = _public_manifest_projection(source_manifest, item)
                (site_dir / manifest_name).write_text(
                    json.dumps(public_manifest, indent=2, ensure_ascii=False),
                    encoding="utf-8",
                )
        public_items.append(public_item)

    catalog_path = site_dir / "sample_catalog.json"
    catalog_path.write_text(
        json.dumps(
            {
                "schema": "eliora-vault-catalog/1.0",
                "generated_at": now,
                "count": len(items),
                "verified_count": sum(bool(item["verified"]) for item in items),
                "items": public_items,
            },
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    proof_item = items[0]
    proof_path = site_dir / "b2-proof.json"
    proof_path.write_text(
        json.dumps(
            {
                "verified": True,
                "run_id": proof_item["run_id"],
                "asset_sha256": proof_item["sha256"],
                "manifest_hash": proof_item["canonical_hash"],
                "manifest_uri": proof_item["manifest_url"],
                "asset_url": proof_item["asset_url"],
                "exported_at": now,
            },
            indent=2,
        ),
        encoding="utf-8",
    )
    return catalog_path, proof_path
