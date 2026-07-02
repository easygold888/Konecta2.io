@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==========================================
echo    ActionQuantlabs - Deploy a GitHub Pages
echo    Rama de publicacion: gh-pages
echo ==========================================
echo.

REM --- Verificar herramientas ---
where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git no esta instalado o no esta en el PATH.
  pause
  exit /b 1
)
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

REM --- Mensaje del deploy: usa lo que escribas despues del .bat, o un timestamp ---
set "MSG=%*"
if "%MSG%"=="" set "MSG=deploy %DATE% %TIME%"

REM --- Compilar el sitio desde cero (borra dist para evitar builds viejos) ---
echo [2/3] Compilando el sitio (build limpio)...
if exist "dist" rmdir /s /q "dist"
call npm run build
if errorlevel 1 (
  echo [ERROR] Fallo el build. No se publico nada.
  pause
  exit /b 1
)

REM --- Publicar dist en la rama gh-pages (lo que sirve GitHub Pages) ---
REM   -b gh-pages  = rama destino
REM   -o origin    = nombre del remoto (NO una URL)
echo [3/3] Publicando en la rama gh-pages...
call npx gh-pages -d dist -b gh-pages -o origin -m "%MSG%"
if errorlevel 1 (
  echo.
  echo [ERROR] Fallo la publicacion en gh-pages.
  echo   - Mira el mensaje de error de arriba para el detalle.
  echo   - Si pide login, corre una vez:  git push origin main
  echo     para que Windows guarde tus credenciales de GitHub, y reintenta.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo    LISTO. Publicado en la rama gh-pages.
echo    URL: https://easygold888.github.io/Konecta2.io/
echo ==========================================
echo    Si no ves el cambio:
echo      1) GitHub ^> Settings ^> Pages ^> Source = rama "gh-pages" (carpeta / root)
echo      2) Espera 1-2 min y refresca con Ctrl+F5 (limpia cache)
echo.
pause
