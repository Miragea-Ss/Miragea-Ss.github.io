"""Genblaze provider for ComfyUI execution and existing generated assets."""

from __future__ import annotations

import hashlib
import mimetypes
import shutil
import os
from pathlib import Path

from genblaze_core import Asset, Modality
from genblaze_core.exceptions import ProviderError
from genblaze_core.models.enums import ProviderErrorCode
from genblaze_core.models.step import Step
from genblaze_core.providers.base import ProviderCapabilities, SyncProvider
from genblaze_core.runnable.config import RunnableConfig
from PIL import Image

from .comfyui import execute_workflow


def _genblaze_file_url(path: Path) -> str:
    """Return a Genblaze 0.3.x-compatible local URL on Windows."""
    if os.name == "nt":
        return f"file:{path.as_posix()}"
    return path.as_uri()


class ComfyUILocalProvider(SyncProvider):
    """Run a ComfyUI API workflow or ingest a prior ComfyUI output.

    Model values:
    - ``comfyui-api`` executes ``workflow_path`` against ComfyUI.
    - ``existing-file-ingest`` uses ``source_path`` without regeneration.
    """

    name = "comfyui-local"

    def get_capabilities(self) -> ProviderCapabilities:
        return ProviderCapabilities(supported_modalities=[Modality.IMAGE])

    def generate(self, step: Step, config: RunnableConfig | None = None) -> Step:
        params = step.params
        output_dir = Path(str(params.get("output_dir", "artifacts/generated")))
        if step.model == "comfyui-api":
            workflow_path = params.get("workflow_path")
            if not workflow_path:
                raise ValueError("workflow_path is required for comfyui-api")
            try:
                source = execute_workflow(
                    Path(str(workflow_path)),
                    server_url=str(params.get("comfy_url", "http://127.0.0.1:8188")),
                    prompt=step.prompt or "",
                    prompt_node=str(params["prompt_node"]) if params.get("prompt_node") else None,
                    output_dir=output_dir,
                    timeout_seconds=float(params.get("timeout_seconds", 600)),
                )
            except ValueError:
                raise
            except Exception as error:
                raise ProviderError(
                    f"ComfyUI generation failed: {error}",
                    error_code=ProviderErrorCode.MODEL_ERROR,
                ) from error
        else:
            source_value = params.get("source_path")
            if not source_value:
                raise ValueError("source_path is required for existing-file-ingest")
            source = Path(str(source_value))

        source = source.expanduser().resolve()
        if not source.is_file():
            raise FileNotFoundError(source)
        original_name = source.name
        data = source.read_bytes()
        digest = hashlib.sha256(data).hexdigest()
        output_dir = output_dir.expanduser().resolve()
        output_dir.mkdir(parents=True, exist_ok=True)
        try:
            source.relative_to(output_dir)
        except ValueError:
            staged = output_dir / f"{source.stem}-{digest[:12]}{source.suffix}"
            shutil.copy2(source, staged)
            source = staged
        media_type = mimetypes.guess_type(source.name)[0] or "application/octet-stream"
        width = height = None
        if media_type.startswith("image/"):
            with Image.open(source) as image:
                width, height = image.size

        step.assets.append(
            Asset(
                url=_genblaze_file_url(source),
                media_type=media_type,
                sha256=digest,
                size_bytes=len(data),
                width=width,
                height=height,
                metadata={"source": "local-workstation", "original_name": original_name},
            )
        )
        return step
