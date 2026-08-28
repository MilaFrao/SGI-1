# Guía de Inicio

## Objetivo

Este documento explica cómo levantar el entorno de desarrollo completo, paso a paso, la primera vez que se trabaja en el proyecto.

---

# 1. Comandos para iniciar la aplicación

## Backend (API)

```bash
cd Backend/src/ValidacionInventario.Api
dotnet run
```
Levanta en `http://localhost:5066`.

## Frontend (navegador, desarrollo)

```bash
cd Frontend/Validacion-Inventario-web
npm install
npm run dev
```
Levanta en `http://localhost:5173`.

## Desktop (Electron, desarrollo)

```bash
cd Desktop
npm install
npm start
```
Arranca el backend como proceso hijo y abre la ventana de Electron.

## Build final (instalador `.exe`)

```bash
cd Desktop
npm run build
```
Publica el backend, compila el frontend, y genera el instalador en `Desktop/dist/`.

---

# 2. Guía de inicio rápido (primera vez en el proyecto)

1. **Cloná el repositorio** y confirmá que tenés instalado: .NET 10 SDK, Node.js, y acceso a una instancia de SQL Server.

2. **Configurá el backend**: copiá `appsettings.example.json` a `appsettings.Development.json` dentro de `Backend/src/ValidacionInventario.Api/`, y completá tu connection string local. Este archivo está en `.gitignore` — nunca se sube.

3. **Instalá dependencias del frontend**:
```bash
   cd Frontend/Validacion-Inventario-web
   npm install
```

4. **Creá el archivo de entorno del frontend**: agregá `.env` en la misma carpeta con:
```text
   VITE_API_BASE_URL=http://localhost:5066
```

5. **Levanta ambos servidores en paralelo** (dos terminales):
```bash
   # Terminal 1
   cd Backend/src/ValidacionInventario.Api && dotnet run

   # Terminal 2
   cd Frontend/Validacion-Inventario-web && npm run dev
```

6. **Abrí `http://localhost:5173`** en el navegador. Completá el formulario de conexión con las credenciales de tu SQL Server local.

7. **(Opcional) Probá el flujo de escritorio**: seguí los pasos de la sección 1 → *Desktop*. La primera vez, `electron` necesita descargar su binario — si falla silenciosamente, revisá que no sea un antivirus corporativo bloqueando la extracción.

---

# 3. Dónde seguir leyendo

- Organización del código y rutas de la API: `docs/ESTRUCTURA_PROYECTO.md`
- Convenciones de código: `docs/CODING_RULES.md`
- Reglas de Git y commits: `docs/VERSION_CONTROL.md`