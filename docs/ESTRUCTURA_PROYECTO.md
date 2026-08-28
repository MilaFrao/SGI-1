# Estructura del Proyecto

## Objetivo

Este documento explica cómo está organizado el código del repositorio, capa por capa y feature por feature, y qué rutas expone la API. Es la referencia para ubicar dónde vive cada cosa.

---

# 1. Estructura de carpetas

```text
SVI-1/
├── Backend/
│   └── src/
│       ├── ValidacionInventario.Api/             → Endpoints, Program.cs
│       ├── ValidacionInventario.Application/      → Casos de uso, contratos, interfaces
│       ├── ValidacionInventario.Domain/           → Reglas de negocio puras
│       └── ValidacionInventario.Infrastructure/   → EF Core, SQL Server, persistencia
├── Frontend/
│   └── Validacion-Inventario-web/
│       └── src/features/                          → Una carpeta por funcionalidad
├── Desktop/                                        → Empaquetado Electron (.exe)
└── docs/                                           → Documentación del proyecto
```

## Backend — por capa

Cada capa sigue la misma subdivisión por feature (`Connections`, `PhysicalInventory`, `InventoryVerification`):

| Capa | Contiene | Subcarpetas típicas |
|---|---|---|
| `Api` | Endpoints Minimal API | `Api/Endpoints/<Feature>/` |
| `Application` | Casos de uso, contratos, interfaces | `<Feature>/Contracts`, `<Feature>/CU`, `<Feature>/Interfaces` |
| `Domain` | Entidades y reglas de negocio, sin dependencias externas | `<Feature>/` |
| `Infrastructure` | EF Core, SQL Server, implementaciones concretas | `Persistence/<Feature>/`, `Persistence/Contexts/`, `Persistence/Entities/` |

Dependencias entre capas: `Api → Application → Domain`, `Infrastructure → Application + Domain`. `Domain` no depende de nada.

## Frontend — por feature

```text
src/features/
├── connection/              → Conexión a SQL Server (formulario + servicio)
├── physical-inventory/      → Tabla principal, consulta y actualización
├── inventory-verification/  → Checkbox "Verificado", snapshot de estado
└── export/                  → Exportar a CSV, Excel y PDF
```

Cada feature sigue la misma subdivisión: `components/`, `services/`, `types/`, y `hooks/` cuando aplica.

## Desktop

```text
Desktop/
├── main.js       → Arranca el backend, espera que responda, abre la ventana
├── preload.js    → Puente seguro entre Electron y el frontend (expone la URL del backend)
└── package.json  → Scripts de build y configuración de electron-builder
```

---

# 2. Rutas de la API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Verifica que la API esté corriendo |
| `POST` | `/api/connections/test` | Prueba una conexión a SQL Server con credenciales dadas |
| `GET` | `/api/physical-inventory` | Devuelve el análisis completo de inventario físico |
| `PUT` | `/api/inventory-verifications` | Marca/desmarca un registro como verificado |

Documentación interactiva disponible en desarrollo: `http://localhost:5066/scalar/v1` (o `/swagger`, según lo que esté activo).

---

# 3. Dónde seguir leyendo

- Cómo levantar el entorno: `docs/GUIA_INICIO.md`
- Convenciones de código: `docs/CODING_RULES.md`
- Reglas de Git y commits: `docs/VERSION_CONTROL.md`