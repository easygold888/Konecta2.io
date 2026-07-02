@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==========================================
echo    ActionQuantlabs - Deploy a Cloudflare Pages
echo    Proyecto: konecta2-io
echo ==========================================
echo.

REM --- Verificar herramientas ---
where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node/npm no esta instalado o no esta en el PATH.
  pause
  exit /b 1
)

REM --- Instalar dependencias si faltan ---
if not exist "node_modules" (
  echo [1/3] Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Fallo npm install.
    pause
    exit /b 1
  )
) else (
  echo [1/3] Dependencias OK.
)

REM --- Compilar el sitio desde cero (borra dist para evitar builds viejos) ---
echo [2/3] Compilando el sitio (Vite build)...
if exist "dist" rmdir /s /q "dist"
call npm run build
if errorlevel 1 (
  echo [ERROR] Fallo el build. No se publico nada.
  pause
  exit /b 1
)

REM --- Desplegar en Cloudflare Pages ---
echo [3/3] Publicando en Cloudflare Pages...
call npx wrangler pages deploy dist --project-name axiomquantlabs
if errorlevel 1 (
  echo [ERROR] Fallo la publicacion en Cloudflare Pages.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo    LISTO. Publicado con exito en Cloudflare.
echo    URL de prueba: https://axiomquantlabs.pages.dev/
echo ==========================================
echo    Recuerda asociar tu dominio propio en el Dashboard de Cloudflare:
echo      1) Ve a Workers & Pages > axiomquantlabs > Custom Domains
echo      2) Asocia tu dominio (ej. axiomquantlabs.xyz o www.axiomquantlabs.xyz)
echo.
pause
