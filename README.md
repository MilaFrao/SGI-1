# Inventory Validation

## Descripción

Sistema de validación de inventario. Este README es el punto de entrada del proyecto: explica qué es, cómo está organizado y dónde encontrar las reglas de trabajo (Git y código).

---

# 1. Estructura del proyecto

```text
inventory-validation/
│
├── README.md
├── VERSION_CONTROL.md
├── CODING_RULES.md
│
├── backend/
├── frontend/
├── docker/
└── docs/
```

## Propósito de cada archivo raíz

| Archivo               | Responsabilidad                            |
|------------------------|---------------------------------------------|
| `README.md`           | Presentación general del proyecto          |
| `VERSION_CONTROL.md`  | Git, ramas, commits y manejo de cambios    |
| `CODING_RULES.md`     | Convenciones y reglas para escribir código |

## Propósito de cada carpeta

| Carpeta     | Contenido                                              |
|-------------|---------------------------------------------------------|
| `backend/`  | API, casos de uso, dominio e infraestructura            |
| `frontend/` | Aplicación React/TypeScript                             |
| `docker/`   | Archivos de configuración de contenedores                |
| `docs/`     | Documentación adicional (arquitectura, requerimientos, etc. — pendiente) |

---

# 2. Antes de empezar a trabajar

1. Lee `VERSION_CONTROL.md` antes de tu primer commit.
2. Lee `CODING_RULES.md` antes de tu primera línea de código.
3. Recuerda: las estructuras de base de datos **existentes y heredadas** (por ejemplo `INVENTARIO`, `MOVTOMAFISICA1`) se respetan tal cual son. Las convenciones nuevas (`snake_case`, `id`, `<entidad>_id`) solo aplican a tablas que este proyecto cree desde cero.

---

# 3. Reglas rápidas (resumen)

- Un commit = un cambio coherente. Nada de mezclar funcionalidad + estilos + refactor en el mismo commit.
- Mensajes de commit en español, formato `<tipo>: <descripción>` (`feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`).
- Ramas desde `main`, formato `<tipo>/<descripcion-en-minusculas-con-guiones>`.
- Nunca subir secretos, tokens ni cadenas de conexión reales. Usar archivos `*.example`.
- Controllers/Endpoints no llevan lógica de negocio: esa vive en Application/Domain.
- No agregar patrones, interfaces o abstracciones "por si acaso" — solo cuando haya una necesidad concreta.
- Todo cambio fuera del alcance actual se documenta aparte; no se implementa por iniciativa propia.

Detalle completo de cada regla en `VERSION_CONTROL.md` y `CODING_RULES.md`.

---

# 4. Pendiente (fuera del alcance de esta primera versión)

- Documento de arquitectura.
- Documento de requerimientos.
- Documento de base de datos.
- Documentación adicional en `docs/`.

Estos se agregarán en documentos separados cuando corresponda, siguiendo el mismo criterio: un documento, una responsabilidad clara.
