# Validación de Inventario

Sistema de validación de inventario físico contra registros del sistema, con backend en .NET, frontend en React y distribución como aplicación de escritorio (Electron).

---

# 1. Estructura del proyecto

```text
SVI-1/
├── Backend/     → API, casos de uso, dominio e infraestructura
├── Frontend/    → Aplicación React/TypeScript
├── Desktop/     → Empaquetado como app de escritorio (Electron)
└── docs/        → Documentación del proyecto
```

Detalle completo de capas, features y rutas en `docs/ESTRUCTURA_PROYECTO.md`.

---

# 2. Documentación

| Documento | Contenido |
|---|---|
| `docs/GUIA_INICIO.md` | Cómo levantar el entorno de desarrollo, paso a paso |
| `docs/ESTRUCTURA_PROYECTO.md` | Organización de carpetas y rutas de la API |
| `docs/VERSION_CONTROL.md` | Reglas de Git, ramas y commits |

Empezá por `GUIA_INICIO.md` si es tu primera vez en el proyecto.

---

# 3. Reglas clave

- Las tablas legacy (`INVENTARIO`, `MOVTOMAFISICA1`, etc.) se respetan tal cual son — nunca se modifican.
- Commits en español, formato `<tipo>: <descripción>`, un cambio coherente por commit.
- Nunca subir secretos ni cadenas de conexión reales — usar archivos `*.example`.