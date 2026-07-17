"""Export credential-safe B2 run evidence for the static judge site."""

from __future__ import annotations

import json
import hashlib
import shutil
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


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
    for index, item in enumerate(items):
        public_item = dict(item)
        if index == 0:
            public_mirror = site_dir / "sample_asset.png"
            if public_mirror.is_file():
                mirror_hash = hashlib.sha256(public_mirror.read_bytes()).hexdigest()
                if mirror_hash != item["sha256"]:
                    raise ValueError("Public sample mirror does not match the verified B2 asset")
                public_item["b2_asset_url"] = item["asset_url"]
                public_item["b2_manifest_url"] = item["manifest_url"]
                public_item["asset_url"] = "./sample_asset.png"
                public_item["manifest_url"] = "./sample_manifest.json"
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
    source_manifest = run_dirs[0] / "manifest.json"
    if source_manifest.is_file():
        shutil.copy2(source_manifest, site_dir / "sample_manifest.json")
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
