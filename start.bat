@echo off
echo =========================================================================
echo   BHU-VEDA: National Land Intelligence & Policy Platform (SIH 2026)
echo   Team ID: PDK-T14 | College: PDKVCET | Lead: PRAVEEN KUMAR A
echo   Problem Statement ID: SIH26019
echo =========================================================================
echo.

echo [1/2] Starting Python FastAPI Backend on port 8000...
start cmd /k "cd backend && .\venv\Scripts\uvicorn.exe main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

echo [2/2] Starting React Vite Frontend on port 5173...
start cmd /k "cd frontend && npm run dev"

echo.
echo Both services launched!
echo - Frontend UI: http://localhost:5173
echo - Backend API Docs: http://localhost:8000/docs
echo.
pause
