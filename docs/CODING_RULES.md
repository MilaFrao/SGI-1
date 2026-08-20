# Reglas de Código

## Objetivo

Este documento define las convenciones y reglas generales para mantener consistencia en el código del proyecto.

Las reglas se aplican de forma pragmática y deben priorizar claridad, cohesión y mantenibilidad.

---

# 1. Reglas generales

- El código debe ser claro y fácil de entender.
- Evitar abstracciones prematuras.
- No duplicar lógica cuando exista una responsabilidad común clara.
- No introducir patrones o dependencias sin una necesidad concreta.
- Mantener las responsabilidades separadas.
- Preservar nombres, contratos y comportamiento existente salvo autorización expresa.
- Antes de realizar un cambio arquitectónico, explicar el impacto, alternativas y motivo.

---

# 2. Convenciones de nombres

## C#

Utilizar:

- `PascalCase` para:
  - Clases.
  - Interfaces.
  - Métodos.
  - Propiedades.
  - Enumeraciones.
  - Records.

Ejemplo:

```csharp
public class InventoryValidation
{
    public decimal Difference { get; set; }
}
```

Utilizar `camelCase` para:

- Variables.
- Parámetros.

Ejemplo:

```csharp
public void Validate(decimal physicalQuantity)
{
    var difference = 0;
}
```

---

## Operaciones asíncronas

Los métodos asíncronos deben utilizar el sufijo:

```text
Async
```

Ejemplo:

```csharp
public Task<InventoryDto> GetInventoryAsync(
    string codigoBarra)
```

---

## Contratos

Utilizar sufijos consistentes:

```text
Dto
Request
Response
```

Ejemplos:

```text
PhysicalInventoryDto
GetPhysicalInventoryRequest
InventoryValidationResponse
```

---

# 3. API

Las rutas deben:

- Utilizar sustantivos.
- Utilizar plural cuando representen colecciones.
- Mantener nombres consistentes.
- Utilizar minúsculas.

Ejemplos:

```text
/api/tomas-fisicas
/api/validaciones
/api/inventarios
```

Evitar rutas basadas directamente en verbos:

```text
/api/get-inventory
/api/create-validation
/api/update-item
```

Las entidades internas no deben exponerse directamente como contratos de la API.

Utilizar DTOs, Requests o Responses según corresponda.

---

# 4. Backend

## Responsabilidades

Los controladores o endpoints no deben contener reglas de negocio complejas.

Su responsabilidad principal será:

```text
Request
   ↓
Validación inicial
   ↓
Caso de uso / Servicio
   ↓
Response
```

Las reglas de negocio deben permanecer fuera de:

- Controllers.
- Endpoints.
- DbContext.
- Componentes visuales.

---

## Dependencias

Las dependencias deben orientarse hacia abstracciones cuando sea necesario.

Evitar acoplar directamente:

```text
API
  ↓
Implementación específica
```

cuando la lógica requiera una abstracción clara.

No crear interfaces sin una necesidad concreta.

---

# 5. Application

Los casos de uso deben representar acciones claras del sistema.

Ejemplos:

```text
GetPhysicalInventoryComparison
ValidateInventoryDifference
VerifyInventoryItem
```

Cada caso de uso debe tener una responsabilidad concreta.

Evitar clases que acumulen múltiples responsabilidades no relacionadas.

---

# 6. Domain

El dominio debe contener las reglas y conceptos propios del negocio.

No debe depender de:

- ASP.NET Core.
- Entity Framework Core.
- SQL Server.
- React.
- Infraestructura externa.

---

# 7. Infrastructure

La infraestructura contiene detalles técnicos como:

- Entity Framework Core.
- SQL Server.
- Implementaciones de acceso a datos.
- Servicios externos.
- Configuración técnica.

Los detalles de infraestructura no deben definir las reglas centrales del negocio.

---

# 8. Entity Framework Core

Las entidades utilizadas para persistencia no deben exponerse directamente a la API.

La configuración de entidades debe mantenerse separada cuando la complejidad lo justifique.

Ejemplo:

```text
Persistence/
├── Contexts/
├── Configurations/
└── Repositories/
```

No crear repositorios genéricos únicamente por seguir un patrón.

Un repositorio debe existir cuando represente una abstracción útil para el dominio o la aplicación.

---

# 9. React y TypeScript

## Componentes

Los componentes deben utilizar `PascalCase`.

Ejemplos:

```text
PhysicalInventoryTable.tsx
InventoryValidationRow.tsx
```

---

## Hooks

Los hooks personalizados deben comenzar con:

```text
use
```

Ejemplos:

```text
usePhysicalInventory.ts
useInventoryValidation.ts
```

---

## Archivos

El nombre del archivo debe ser coherente con el componente o responsabilidad principal.

Evitar archivos con múltiples responsabilidades no relacionadas.

---

## Lógica de negocio

Los componentes visuales deben enfocarse principalmente en:

- Renderizar información.
- Gestionar interacción de usuario.
- Coordinar estado relacionado con la interfaz.

Las reglas de negocio complejas no deben duplicarse dentro de múltiples componentes.

---

# 10. Base de datos

Cuando el proyecto cree o controle nuevas estructuras de base de datos, utilizar:

- `snake_case` para tablas y columnas.
- `id` para claves primarias.
- `<entidad>_id` para claves foráneas.
- Fechas almacenadas en UTC cuando corresponda.

Ejemplo:

```text
inventory_validation
id
inventory_id
created_at
updated_at
```

Las estructuras existentes de bases de datos externas o heredadas deben respetarse y no modificarse únicamente para cumplir estas convenciones.

---

# 11. Validaciones

Toda entrada externa debe ser validada según corresponda.

Las validaciones pueden incluir:

- Campos requeridos.
- Formato.
- Rangos.
- Valores permitidos.
- Reglas del negocio.

La validación técnica no debe reemplazar las reglas del negocio.

---

# 12. Manejo de errores

Los errores deben manejarse de forma consistente.

Evitar:

- Ocultar excepciones.
- Devolver detalles sensibles al cliente.
- Utilizar mensajes genéricos cuando se pueda proporcionar información útil.

Las respuestas de error deben ser coherentes dentro de la API.

---

# 13. Operaciones sensibles

Las operaciones que modifiquen información relevante deben considerar según corresponda:

- Autorización.
- Validación.
- Auditoría.
- Manejo de errores.

El nivel de protección dependerá del riesgo y del alcance de la operación.

---

# 14. Pruebas

Las pruebas deben ser proporcionales al riesgo del cambio.

Priorizar pruebas sobre:

- Reglas de negocio.
- Cálculos.
- Validaciones.
- Casos con mayor impacto.
- Comportamientos que puedan romper procesos existentes.

No agregar pruebas únicamente para aumentar cantidad.

---

# 15. MVP y funcionalidades futuras

El código debe diferenciar claramente:

```text
MVP
```

de:

```text
Versión futura
```

No implementar funcionalidades futuras dentro del MVP sin una necesidad aprobada.

Las mejoras identificadas deben documentarse como:

```text
Pendiente
Fuera del alcance actual
Versión futura
```

según corresponda.
