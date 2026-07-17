"""Small ComfyUI API client used by the Genblaze provider."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request
import uuid
from pathlib import Path
from typing import Any


def _json_request(url: str, *, data: dict[str, Any] | None = None) -> dict[str, Any]:
    encoded = None
    headers: dict[str, str] = {}
    if data is not None:
        encoded = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=encoded, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def _first_image(history: dict[str, Any], prompt_id: str) -> dict[str, str]:
    run = history.get(prompt_id, history)
    for node in run.get("outputs", {}).values():
        images = node.get("images", [])
        if images:
            image = images[0]
            return {
                "filename": image["filename"],
                "subfolder": image.get("subfolder", ""),
                "type": image.get("type", "output"),
            }
    raise RuntimeError("ComfyUI completed without an image output")


def execute_workflow(
    workflow_path: Path,
    *,
    server_url: str,
    prompt: str,
    prompt_node: str | None,
    output_dir: Path,
    timeout_seconds: float = 600,
) -> Path:
    workflow = json.loads(workflow_path.read_text(encoding="utf-8"))
    if prompt_node:
        try:
            workflow[prompt_node]["inputs"]["text"] = prompt
        except (KeyError, TypeError) as error:
            raise ValueError(f"Prompt node {prompt_node!r} has no inputs.text") from error

    base = server_url.rstrip("/")
    client_id = str(uuid.uuid4())
    queued = _json_request(f"{base}/prompt", data={"prompt": workflow, "client_id": client_id})
    prompt_id = queued.get("prompt_id")
    if not prompt_id:
        raise RuntimeError(f"ComfyUI did not return prompt_id: {queued}")

    deadline = time.monotonic() + timeout_seconds
    while time.monotonic() < deadline:
        history = _json_request(f"{base}/history/{prompt_id}")
        if prompt_id in history:
            image = _first_image(history, prompt_id)
            query = urllib.parse.urlencode(image)
            output_dir.mkdir(parents=True, exist_ok=True)
            target = output_dir / image["filename"]
            with urllib.request.urlopen(f"{base}/view?{query}", timeout=60) as response:
                target.write_bytes(response.read())
            return target
        time.sleep(1)

    raise TimeoutError(f"ComfyUI run {prompt_id} exceeded {timeout_seconds:.0f}s")

