@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==========================================
echo    ActionQuantlabs - Deploy a GitHub Pages
echo    Rama de publicacion: main (carpeta /docs)
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

REM --- Mensaje del commit/deploy ---
set "MSG=%*"
if "%MSG%"=="" set "MSG=deploy: actualizacion %DATE% %TIME%"

REM --- Compilar el sitio desde cero a la carpeta docs/ ---
echo [2/4] Compilando el sitio (build limpio a la carpeta docs)...
if exist "docs" rmdir /s /q "docs"
call npm run build
if errorlevel 1 (
  echo [ERROR] Fallo el build. No se publico nada.
  pause
  exit /b 1
)

REM --- Guardar todos los cambios en git (rama main, incluyendo docs) ---
echo [3/4] Guardando cambios en git (rama main)...
git add -A
git commit -m "%MSG%"
if errorlevel 1 (
  echo [INFO] No habia cambios pendientes para hacer commit.
)

REM --- Subir todo a la rama main ---
echo [4/4] Subiendo todo a la rama main...
git push origin main
if errorlevel 1 (
  echo [ERROR] Fallo el push a origin main. Revisa tu conexion o credenciales de GitHub.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo    LISTO. Publicado y guardado en main.
echo    URL: https://easygold888.github.io/Konecta2.io/
echo ==========================================
echo    IMPORTANTE:
echo      En GitHub (Settings > Pages), debes asegurarte de configurar:
echo      - Build and deployment > Source: "Deploy from a branch"
echo      - Branch: "main" y cambiar la carpeta a "/docs"
echo.
pause
