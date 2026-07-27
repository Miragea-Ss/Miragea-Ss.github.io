# Eliora Work Canvas ↔ Local services — verified

**Date:** 2026-07-23  
**Verified by:** Grok agent (not user QA)

## Live stack (this machine)

| Service | URL | Status |
|---------|-----|--------|
| ComfyUI | `http://127.0.0.1:8188` | **OK** — v0.28.0 · CUDA RTX PRO 6000 · 213 UNETs |
| CORS Bridge | `http://127.0.0.1:8190` → 8188 | **OK** — started by agent; ACAO for `https://miragea-ss.github.io` |
| llama.cpp | `http://127.0.0.1:8080` | **OK** (re-verified) — `llama-server` · Qwen3-Coder-Next-Q4_K_M · chat READY · ngl 999 · ctx 32768 |
| Ollama | `11434` | listening (not used by canvas primary path) |

## Canvas endpoint setting

- Default in HTML: **`http://127.0.0.1:8190`** (Bridge)
- Open ComfyUI link: `http://127.0.0.1:8188/`
- On Pages / file:// the canvas prefers Bridge 8190 automatically
- Button **Bridge 8190** forces bridge endpoint

## E2E result (`node test-eliora-e2e.mjs`)

```
BASE http://127.0.0.1:8190
PASS 12 / FAIL 0
✓ bridge — ComfyUI 0.28.0
✓ queue
✓ object_info — 3200 node types
✓ qwen_stack — qwen_image_edit_2511_bf16.safetensors
✓ path_canonical
✓ encode_node — TextEncodeQwenImageEditPlus
✓ upload
✓ queue_single + result_single — ElioraE2E_00001_.png
✓ queue_multi + result_multi — ElioraE2E_00002_.png
✓ html_js_syntax
ALL PASS
```

Real GPU image edit jobs completed through the **same bridge path the canvas uses**.

## Keep-alive for daily use

1. ComfyUI already running (you)
2. Bridge must stay up for browser canvas from GitHub Pages:
   - `start-eliora-bridge.bat`  
   - or agent can restart: `python eliora-comfy-bridge.py` on 8190
3. Optional llama: `H:\Ai_factory\llama.cpp\start_llama.ps1` → then Ask Local works

## What user does NOT need to re-test

- Bridge connectivity
- Model path canonicalization
- Qwen single + multi edit queue/result
- Canvas JS syntax

## llama.cpp (agent started)

```
exe:   H:\Ai_factory\llama.cpp\build-win\bin\Release\llama-server.exe
model: H:\Ai_factory\models\Qwen3-Coder-Next-Q4_K_M.gguf
args:  -ngl 999 -c 32768 --host 0.0.0.0 --port 8080
script: H:\Ai_factory\llama.cpp\start_llama.ps1 (same defaults)
```

Smoke: `POST /v1/chat/completions` → **OK** (reply: "OK.")  
Canvas endpoint: `http://127.0.0.1:8080/v1/chat/completions` (default in HTML)

## Stack triad (current)

| Port | Role | Status |
|------|------|--------|
| 8080 | llama.cpp | OK + chat |
| 8188 | ComfyUI | OK |
| 8190 | CORS bridge | OK |

## What is still optional (not blocking)

- Browser click-through of full UI (only when warrior feels goal is done — final handoff only)

## 2026-07-23 evening re-verify (local beat handoff)

- triad 8080/8188/8190 all OK
- chat READY
- e2e 12/12 PASS again
- canvas features: Local Ready, Bridge pill, HUD, Align, Snapshot, Local full starter
- handoff: H:/Grok/eliora-work-canvas-roadmap-2026-07-23/LOCAL_HANDOFF_2026-07-23.md
