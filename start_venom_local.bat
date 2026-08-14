@echo off
title VENOM GPT - Local Test
cd /d "%~dp0public"
where python >nul 2>nul
if %errorlevel% neq 0 (
  echo Python 3 is required.
  pause
  exit /b 1
)
start "" "http://localhost:3000"
python -m http.server 3000
