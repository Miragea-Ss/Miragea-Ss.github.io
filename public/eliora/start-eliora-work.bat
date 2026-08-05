@echo off
title Eliora Local Work
cd /d "%~dp0"

if defined ELIORA_PORT (
  set "PORT=%ELIORA_PORT%"
) else (
  set "PORT=8765"
)
set "SERVE_DIR="
set "PAGE="
set "ELIORA_PY_PREFIX="

rem Case A: bat next to infinite-canvas.html (H:\Grok\miragea-infinite-canvas-YYYY-MM-DD)
if exist "%~dp0infinite-canvas.html" (
  rem The trailing dot avoids a quoted Windows argument ending in backslash.
  set "SERVE_DIR=%~dp0."
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
where py >nul 2>&1 && set "ELIORA_PY=py" && set "ELIORA_PY_PREFIX=-3" && goto :have_py

echo Python not found. Set ELIORA_PY=path\to\python.exe then re-run.
pause
exit /b 1

:have_py
rem Reuse the requested URL when it is already serving this kit.
set "CANVAS_READY="
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2).StatusCode | Out-Null; exit 0 } catch { exit 1 }"
if not errorlevel 1 set "CANVAS_READY=1"

rem If the default port belongs to another app, select the next free local port.
if not defined CANVAS_READY if not defined ELIORA_PORT (
  for /f %%P in ('powershell -NoProfile -Command "$p=8765; while($p -lt 8800){try{$l=[Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback,$p);$l.Start();$l.Stop();$p;break}catch{$p++}}"') do set "PORT=%%P"
  set "URL=http://127.0.0.1:%PORT%/%PAGE%"
)

echo Serve dir: %SERVE_DIR%
echo URL: %URL%

rem --- Eliora Bridge v2 on 8190 (ComfyUI + local Agent/MCP) ---
powershell -NoProfile -Command "try { $r=Invoke-RestMethod -Uri 'http://127.0.0.1:8190/eliora/health' -TimeoutSec 2; if($r.version -ge 2){exit 0}; exit 1 } catch { exit 1 }"
if errorlevel 1 (
  powershell -NoProfile -Command "try { $c=New-Object Net.Sockets.TcpClient('127.0.0.1',8190); $c.Close(); exit 0 } catch { exit 1 }"
  if not errorlevel 1 (
    echo ERROR: Port 8190 is occupied by an old bridge or another app.
    echo Close that bridge window, then run START-ELIORA-CANVAS.bat again.
    pause
    exit /b 2
  )
  echo Starting Eliora Local Bridge v2 on 8190...
  start "Eliora Local Bridge" /MIN cmd /c ""%ELIORA_PY%" %ELIORA_PY_PREFIX% "%~dp0eliora-comfy-bridge.py""
  timeout /t 2 /nobreak >nul
  powershell -NoProfile -Command "try { $r=Invoke-RestMethod -Uri 'http://127.0.0.1:8190/eliora/health' -TimeoutSec 3; if($r.version -ge 2){exit 0}; exit 1 } catch { exit 1 }"
  if errorlevel 1 (
    echo ERROR: Eliora Local Bridge v2 did not start.
    echo Run start-eliora-bridge.bat to see the detailed error.
    pause
    exit /b 3
  )
) else (
  echo Eliora Local Bridge v2 already up.
)

rem --- Local HTTP server ---
if defined CANVAS_READY goto :server_ready
echo Starting canvas server on %PORT%...
start "Eliora Canvas Server" /MIN cmd /c ""%ELIORA_PY%" %ELIORA_PY_PREFIX% -m http.server %PORT% --bind 127.0.0.1 --directory "%SERVE_DIR%""
timeout /t 2 /nobreak >nul
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 3).StatusCode | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  echo ERROR: Canvas server did not start on %PORT%.
  pause
  exit /b 4
)

:server_ready
echo Canvas server ready.

if defined ELIORA_NO_OPEN (
  echo Browser open skipped because ELIORA_NO_OPEN is set.
) else (
  echo Opening %URL%
  start "" "%URL%"
)
echo.
echo Keep Bridge + server windows running. Close them when done.
exit /b 0
