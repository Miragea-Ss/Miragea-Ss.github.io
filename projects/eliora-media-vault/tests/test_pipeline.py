from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

import pytest
from PIL import Image

from eliora_media_vault.export import export_site
from eliora_media_vault.pipeline import VaultRunConfig, _region_from_s3_api_url, run_vault
from eliora_media_vault.providers import _genblaze_file_url
from eliora_media_vault.cli import _load_local_env


def _sample_image(path: Path) -> None:
    image = Image.new("RGB", (64, 36), (10, 40, 70))
    image.save(path, "PNG")


def test_offline_pipeline_creates_verified_manifest(tmp_path: Path) -> None:
    asset = tmp_path / "sample.png"
    _sample_image(asset)
    output = tmp_path / "artifacts"

    run_dir = run_vault(
        VaultRunConfig(
            prompt="A durable moonlit media archive",
            asset=asset,
            checkpoint="test-sdxl",
            seed=71,
            output_root=output,
        )
    )

    manifest = json.loads((run_dir / "manifest.json").read_text(encoding="utf-8"))
    catalog = json.loads((run_dir / "catalog-item.json").read_text(encoding="utf-8"))
    expected = hashlib.sha256(asset.read_bytes()).hexdigest()
    assert catalog["sha256"] == expected
    assert catalog["verified"] is True
    assert catalog["storage"] == "local-artifact"
    assert manifest["canonical_hash"] == catalog["canonical_hash"]
    assert manifest["run"]["steps"][0]["provider"] == "comfyui-local"


def test_pipeline_rejects_missing_input(tmp_path: Path) -> None:
    try:
        run_vault(VaultRunConfig(prompt="missing", output_root=tmp_path))
    except ValueError as error:
        assert "Provide either" in str(error)
    else:
        raise AssertionError("missing input was accepted")


def test_comfyui_failure_falls_back_to_existing_asset(tmp_path: Path) -> None:
    asset = tmp_path / "fallback.png"
    _sample_image(asset)
    workflow = tmp_path / "workflow.json"
    workflow.write_text("{}", encoding="utf-8")

    run_dir = run_vault(
        VaultRunConfig(
            prompt="Preserve useful work during a provider outage",
            asset=asset,
            workflow=workflow,
            comfy_url="http://127.0.0.1:1",
            output_root=tmp_path / "artifacts",
        )
    )
    catalog = json.loads((run_dir / "catalog-item.json").read_text(encoding="utf-8"))
    assert catalog["pipeline_model"] == "existing-file-ingest"
    assert catalog["verified"] is True


def test_site_export_refuses_local_only_proof(tmp_path: Path) -> None:
    run_dir = tmp_path / "run"
    run_dir.mkdir()
    (run_dir / "catalog-item.json").write_text(
        json.dumps({"storage": "local-artifact", "verified": True}), encoding="utf-8"
    )
    try:
        export_site([run_dir], tmp_path / "site")
    except ValueError as error:
        assert "non-B2 proof" in str(error)
    else:
        raise AssertionError("local-only evidence was exported as B2 proof")


def test_local_env_loader_does_not_override_process_environment(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    env_file = tmp_path / ".env"
    env_file.write_text(
        "B2_BUCKET=-miragea-genmedia-0710\nB2_REGION=us-east-005\n",
        encoding="utf-8",
    )
    monkeypatch.setenv("B2_BUCKET", "already-set")
    monkeypatch.delenv("B2_REGION", raising=False)

    _load_local_env(env_file)

    assert os.environ["B2_BUCKET"] == "already-set"
    assert os.environ["B2_REGION"] == "us-east-005"


def test_region_is_extracted_from_backblaze_s3_url() -> None:
    assert (
        _region_from_s3_api_url("https://s3.us-east-005.backblazeb2.com")
        == "us-east-005"
    )


def test_genblaze_file_url_has_no_windows_leading_slash(tmp_path: Path) -> None:
    url = _genblaze_file_url((tmp_path / "asset.png").resolve())
    if os.name == "nt":
        assert url.startswith("file:")
        assert not url.startswith("file:///")


def test_site_export_keeps_public_mirror_and_b2_proof(tmp_path: Path) -> None:
    run_dir = tmp_path / "run"
    site_dir = tmp_path / "site"
    run_dir.mkdir()
    site_dir.mkdir()
    asset_bytes = b"verified-image-bytes"
    asset_hash = hashlib.sha256(asset_bytes).hexdigest()
    (site_dir / "sample_asset.png").write_bytes(asset_bytes)
    (run_dir / "manifest.json").write_text(
        json.dumps({"manifest_uri": "https://s3.example/manifest.json"}),
        encoding="utf-8",
    )
    (run_dir / "catalog-item.json").write_text(
        json.dumps(
            {
                "storage": "backblaze-b2",
                "verified": True,
                "manifest_url": "https://s3.example/manifest.json",
                "asset_url": "https://s3.example/asset.png",
                "sha256": asset_hash,
                "canonical_hash": "manifest-hash",
                "run_id": "run-1",
            }
        ),
        encoding="utf-8",
    )

    catalog_path, proof_path = export_site([run_dir], site_dir)
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    proof = json.loads(proof_path.read_text(encoding="utf-8"))

    assert catalog["items"][0]["asset_url"] == "./sample_asset.png"
    assert catalog["items"][0]["b2_asset_url"] == "https://s3.example/asset.png"
    assert catalog["items"][0]["manifest_url"] == "./sample_manifest.json"
    assert catalog["items"][0]["b2_manifest_url"] == "https://s3.example/manifest.json"
    assert proof["asset_url"] == "https://s3.example/asset.png"
    assert (site_dir / "sample_manifest.json").is_file()


def test_site_export_mirrors_every_verified_run(tmp_path: Path) -> None:
    site_dir = tmp_path / "site"
    site_dir.mkdir()
    run_dirs = []
    for number in (1, 2):
        run_dir = tmp_path / f"run-{number}"
        run_dir.mkdir()
        asset_bytes = f"verified-image-{number}".encode()
        asset_hash = hashlib.sha256(asset_bytes).hexdigest()
        (run_dir / "asset.png").write_bytes(asset_bytes)
        (run_dir / "manifest.json").write_text(
            json.dumps({"run": {"steps": [{"assets": [{"sha256": asset_hash}]}]}}),
            encoding="utf-8",
        )
        (run_dir / "catalog-item.json").write_text(
            json.dumps(
                {
                    "storage": "backblaze-b2",
                    "verified": True,
                    "manifest_url": f"https://s3.example/run-{number}/manifest.json",
                    "asset_url": f"https://s3.example/run-{number}/asset.png",
                    "sha256": asset_hash,
                    "canonical_hash": f"manifest-hash-{number}",
                    "run_id": f"run-{number}",
                }
            ),
            encoding="utf-8",
        )
        run_dirs.append(run_dir)

    catalog_path, _ = export_site(run_dirs, site_dir)
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))

    assert catalog["count"] == 2
    assert catalog["items"][0]["asset_url"] == "./sample_asset.png"
    assert catalog["items"][1]["asset_url"] == "./vault_asset_02.png"
    assert catalog["items"][1]["manifest_url"] == "./vault_manifest_02.json"
    assert (site_dir / "vault_asset_02.png").read_bytes() == b"verified-image-2"
    assert (site_dir / "vault_manifest_02.json").is_file()
