# Eliora Infinite Canvas — local setup

**Live:** https://miragea-ss.github.io/eliora/infinite-canvas.html  
**Local files:** this folder (`public/eliora/`)

## Japanese users

- Browser language `ja` → UI defaults to **JA** automatically.
- Toggle **EN / JA** in the top bar anytime (saved in this browser).
- Toolbar, panels, onboarding, errors, and templates are localized for Japanese.

## Quick start (ComfyUI on this PC)

1. Start **ComfyUI** on `http://127.0.0.1:8188`
2. Double-click **`start-eliora-work.bat`**
   - Starts **Bridge 8190** (`eliora-comfy-bridge.py`) if not already up
   - Serves `public/` on port **8765**
   - Opens `http://127.0.0.1:8765/eliora/infinite-canvas.html`
3. In the canvas, keep Endpoint on Bridge **8190** (default) or click **Bridge 8190**

## Bridge only

- **`start-eliora-bridge.bat`** — proxy only: `127.0.0.1:8190` → ComfyUI `:8188`
- Needed when the canvas is opened from **GitHub Pages** (browser CORS / private network)

## Python path

Bats look for:

1. Environment variable **`ELIORA_PY`** (recommended on other PCs)
2. ComfyUI portable embed (if present on this machine)
3. `python` / `py -3` on PATH

Example (other PC):

```bat
set ELIORA_PY=C:\path\to\python.exe
start-eliora-work.bat
```

## Files

| File | Role |
|------|------|
| `infinite-canvas.html` | Main product canvas |
| `operator-canvas.html` | Local operator variant |
| `eliora-comfy-bridge.py` | CORS bridge |
| `start-eliora-work.bat` | One-click local work |
| `start-eliora-bridge.bat` | Bridge only |

## Do not

- Open canvas as `file://` if you need ComfyUI (use the bat server)
- Commit machine-only secrets; BYOK keys stay in browser localStorage
