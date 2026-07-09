@echo off
title Eliora Comfy Bridge (8190)
cd /d "%~dp0"

if defined ELIORA_PY if exist "%ELIORA_PY%" goto :run
if exist "H:\Tools_zn\ComfyUI_V0.26\ComfyUI_windows_portable\python_embeded\python.exe" (
  set "ELIORA_PY=H:\Tools_zn\ComfyUI_V0.26\ComfyUI_windows_portable\python_embeded\python.exe"
  goto :run
)
where python >nul 2>&1 && set "ELIORA_PY=python" && goto :run
where py >nul 2>&1 && set "ELIORA_PY=py -3" && goto :run

echo Python not found. Set ELIORA_PY to your python.exe and re-run.
pause
exit /b 1

:run
echo Starting bridge with: %ELIORA_PY%
%ELIORA_PY% "%~dp0eliora-comfy-bridge.py"
pause
