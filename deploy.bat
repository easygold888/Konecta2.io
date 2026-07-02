@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==========================================
echo    ActionQuantlabs - Deploy a GitHub Pages
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
  echo [1/4] Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Fallo npm install.
    pause
    exit /b 1
  )
) else (
  echo [1/4] Dependencias OK.
)

REM --- Mensaje de commit: usa lo que escribas despues del .bat, o un timestamp ---
set "MSG=%*"
if "%MSG%"=="" set "MSG=deploy: actualizacion %DATE% %TIME%"

REM --- Guardar y subir el codigo fuente a la rama main ---
echo [2/4] Guardando cambios en git (rama main)...
git add -A
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "%MSG%"
  if errorlevel 1 (
    echo [ERROR] Fallo el commit.
    pause
    exit /b 1
  )
) else (
  echo        Sin cambios nuevos que guardar.
)

git push origin main
if errorlevel 1 (
  echo [ERROR] Fallo el push a origin main. Revisa tu conexion o credenciales de GitHub.
  pause
  exit /b 1
)

REM --- Compilar y publicar dist en la rama gh-pages ---
echo [3/4] Compilando el sitio (vite build)...
echo [4/4] Publicando en GitHub Pages (rama gh-pages)...
call npm run deploy
if errorlevel 1 (
  echo [ERROR] Fallo el deploy a GitHub Pages.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo    LISTO. Sitio desplegado con exito.
echo    URL: https://easygold888.github.io/Konecta2.io/
echo ==========================================
echo    Nota: la primera vez, en GitHub abre
echo    Settings ^> Pages y pon Source = rama "gh-pages".
echo    Los cambios pueden tardar 1-2 min en verse.
echo.
pause
