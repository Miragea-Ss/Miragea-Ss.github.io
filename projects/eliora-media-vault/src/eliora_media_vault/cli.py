"""Command-line interface."""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from .export import export_site
from .pipeline import VaultRunConfig, run_vault


def _load_local_env(path: Path = Path(".env")) -> None:
    """Load an ignored local env file without overriding the process environment."""
    if not path.is_file():
        return
    for raw_line in path.read_text(encoding="utf-8-sig").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key:
            os.environ.setdefault(key, value)


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="eliora-vault")
    subparsers = parser.add_subparsers(dest="command", required=True)
    run = subparsers.add_parser("run", help="Create and verify a vault run")
    run.add_argument("--asset", type=Path, help="Existing generated media fallback")
    run.add_argument("--workflow", type=Path, help="ComfyUI workflow in API format")
    run.add_argument("--prompt", required=True)
    run.add_argument("--prompt-node", help="ComfyUI node whose inputs.text is replaced")
    run.add_argument("--comfy-url", default=os.environ.get("COMFYUI_URL", "http://127.0.0.1:8188"))
    run.add_argument("--checkpoint", default="operator-recorded-local-checkpoint")
    run.add_argument("--seed", type=int)
    run.add_argument("--output", type=Path, default=Path("artifacts"))
    run.add_argument("--b2", action="store_true", help="Persist via genblaze-s3 to Backblaze B2")
    export = subparsers.add_parser("export-site", help="Export verified B2 runs to the judge site")
    export.add_argument("--run-dir", type=Path, action="append", required=True)
    export.add_argument("--site-dir", type=Path, required=True)
    return parser


def main() -> None:
    _load_local_env()
    args = _parser().parse_args()
    if args.command == "run":
        run_dir = run_vault(
            VaultRunConfig(
                prompt=args.prompt,
                asset=args.asset,
                workflow=args.workflow,
                prompt_node=args.prompt_node,
                comfy_url=args.comfy_url,
                checkpoint=args.checkpoint,
                seed=args.seed,
                output_root=args.output,
                use_b2=args.b2,
            )
        )
        print(f"Verified vault run: {run_dir}")
    elif args.command == "export-site":
        catalog, proof = export_site(args.run_dir, args.site_dir)
        print(f"Exported catalog: {catalog}")
        print(f"Exported B2 proof: {proof}")


if __name__ == "__main__":
    main()
