@echo off
title Eliora Local Work
cd /d "%~dp0"

rem public/ is parent of this folder (public/eliora)
set "PUBLIC=%~dp0.."
set PORT=8765
set URL=http://127.0.0.1:%PORT%/eliora/infinite-canvas.html

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
rem --- ComfyUI Bridge 8190 (CORS for canvas on GitHub Pages / localhost) ---
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri 'http://127.0.0.1:8190/system_stats' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  echo Starting Eliora Comfy Bridge on 8190...
  start "Eliora Comfy Bridge" /MIN cmd /c %ELIORA_PY% "%~dp0eliora-comfy-bridge.py"
  timeout /t 2 /nobreak >nul
)

rem --- Local HTTP server (avoid file:// CORS block) ---
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  echo Starting canvas server on %PORT%...
  start "Eliora Canvas Server" /MIN cmd /c %ELIORA_PY% -m http.server %PORT% --directory "%PUBLIC%"
  timeout /t 1 /nobreak >nul
)

echo Opening %URL%
start "" "%URL%"
