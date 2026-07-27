@echo off
title Eliora Local Work
cd /d "%~dp0"

set PORT=8765
set "SERVE_DIR="
set "PAGE="

rem Case A: bat next to infinite-canvas.html (H:\Grok\miragea-infinite-canvas-YYYY-MM-DD)
if exist "%~dp0infinite-canvas.html" (
  set "SERVE_DIR=%~dp0"
  set "PAGE=infinite-canvas.html"
  goto :ready
)

rem Case B: bat under public/eliora (site tree) — serve public root
if exist "%~dp0..\eliora\infinite-canvas.html" (
  set "SERVE_DIR=%~dp0.."
  set "PAGE=eliora/infinite-canvas.html"
  goto :ready
)

echo ERROR: infinite-canvas.html not found next to this bat.
echo Expected: %~dp0infinite-canvas.html
pause
exit /b 1

:ready
set "URL=http://127.0.0.1:%PORT%/%PAGE%"

if defined ELIORA_PY if exist "%ELIORA_PY%" goto :have_py
if exist "H:\Tools_zn\ComfyUI_V0.26\ComfyUI_windows_portable\python_embeded\python.exe" (
  set "ELIORA_PY=H:\Tools_zn\ComfyUI_V0.26\ComfyUI_windows_portable\python_embeded\python.exe"
  goto :have_py
)
where python >nul 2>&1 && set "ELIORA_PY=python" && goto :have_py
where py >nul 2>&1 && set "ELIORA_PY=py -3" && goto :have_py

echo Python not found. Set ELIORA_PY=path\to\python.exe then re-run.
pause
exit /b 1

:have_py
echo Serve dir: %SERVE_DIR%
echo URL: %URL%

rem --- ComfyUI Bridge 8190 (CORS for canvas) ---
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri 'http://127.0.0.1:8190/system_stats' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  echo Starting Eliora Comfy Bridge on 8190...
  start "Eliora Comfy Bridge" /MIN cmd /c "%ELIORA_PY%" "%~dp0eliora-comfy-bridge.py"
  timeout /t 2 /nobreak >nul
) else (
  echo Bridge 8190 already up.
)

rem --- Local HTTP server ---
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  echo Starting canvas server on %PORT%...
  start "Eliora Canvas Server" /MIN cmd /c "%ELIORA_PY%" -m http.server %PORT% --directory "%SERVE_DIR%"
  timeout /t 2 /nobreak >nul
) else (
  echo Canvas server already serving.
)

echo Opening %URL%
start "" "%URL%"
echo.
echo Keep Bridge + server windows running. Close them when done.
exit /b 0
