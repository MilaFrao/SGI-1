# Control de Versiones

## Objetivo

Este documento define las reglas para el uso de Git y GitHub dentro del proyecto.

Su objetivo es mantener un historial de cambios claro, evitar modificaciones accidentales y facilitar la identificación del propósito de cada cambio.

---

# 1. Reglas generales

- Todo cambio relevante debe realizarse dentro de un contexto de trabajo definido.
- No se deben realizar cambios ajenos a la tarea o alcance actual.
- Antes de realizar un commit, se debe revisar qué archivos fueron modificados.
- No se deben incluir secretos, credenciales o archivos de configuración sensibles en el repositorio.
- Cada commit debe representar un cambio coherente y relacionado.
- Evitar commits que mezclen cambios no relacionados.

Ejemplo incorrecto:

- Agregar una funcionalidad.
- Cambiar estilos no relacionados.
- Refactorizar otra parte del sistema.
- Modificar documentación ajena.

Todo dentro del mismo commit.

Ejemplo correcto:

- Un commit para la funcionalidad.
- Un commit separado para cambios de estilos relacionados.
- Un commit separado para documentación.

---

# 2. Estado del repositorio

Antes de iniciar un trabajo, revisar el estado actual:

```bash
git status
```

Antes de realizar un commit, revisar nuevamente los cambios:

```bash
git status
git diff
```

Solo se deben agregar al commit los archivos que correspondan al trabajo realizado.

---

# 3. Commits

Los mensajes de commit deben describir claramente el cambio realizado.

Formato:

```text
<tipo>: <descripción breve>
```

Tipos iniciales:

- `feat`: nueva funcionalidad.
- `fix`: corrección de un error.
- `refactor`: modificación interna sin cambiar el comportamiento esperado.
- `docs`: cambios en documentación.
- `test`: creación o modificación de pruebas.
- `chore`: configuración, mantenimiento o tareas auxiliares.
- `style`: cambios visuales o de formato sin modificar lógica.

Ejemplos:

```text
feat: agregar consulta de toma física
fix: corregir cálculo de diferencia de inventario
docs: documentar reglas de control de versiones
refactor: reorganizar servicio de validación
test: agregar pruebas para validación de cantidades
chore: configurar variables de entorno
```

Los mensajes deben:

- Estar escritos en español.
- Ser claros y específicos.
- Describir el cambio realizado.
- Evitar mensajes genéricos.

Ejemplos incorrectos:

```text
cambios
update
fix
cosas nuevas
prueba
```

---

# 4. Alcance de los commits

Cada commit debe contener cambios relacionados entre sí.

Antes de confirmar un cambio, verificar:

```text
¿Qué problema resuelve este commit?
```

Si no es posible responder claramente, probablemente el commit contiene demasiados cambios o cambios no relacionados.

---

# 5. Ramas

La rama principal del proyecto será:

```text
main
```

Los cambios de desarrollo se realizarán en ramas separadas.

Formato:

```text
<tipo>/<descripcion>
```

Ejemplos:

```text
feature/consulta-toma-fisica
feature/validacion-inventario
fix/calculo-diferencia
refactor/servicio-validacion
docs/documentacion-base
chore/configuracion-inicial
```

La descripción debe:

- Estar en minúsculas.
- Usar guiones.
- Representar claramente el propósito de la rama.

---

# 6. Flujo de trabajo

El flujo general será:

```text
main
  │
  └── rama de trabajo
          │
          ├── desarrollo
          ├── validación
          └── merge
                │
                ▼
               main
```

Proceso:

1. Actualizar la rama principal.

```bash
git checkout main
git pull
```

2. Crear una rama para el trabajo.

```bash
git checkout -b feature/nombre-del-cambio
```

3. Realizar únicamente los cambios correspondientes al alcance definido.

4. Revisar los cambios.

```bash
git status
git diff
```

5. Agregar los archivos correspondientes.

```bash
git add <archivo>
```

Evitar utilizar indiscriminadamente:

```bash
git add .
```

cuando no se haya revisado previamente qué archivos serán incluidos.

6. Crear un commit.

```bash
git commit -m "feat: descripcion del cambio"
```

7. Subir la rama al repositorio remoto.

```bash
git push -u origin feature/nombre-del-cambio
```

8. Validar los cambios antes de integrarlos a `main`.

---

# 7. Archivos sensibles

No deben incluirse en el repositorio:

- Contraseñas.
- Tokens.
- Cadenas de conexión reales.
- Claves privadas.
- Archivos de configuración con secretos.

Los valores reales deben entregarse y configurarse mediante un canal seguro.

El repositorio puede incluir archivos de ejemplo, por ejemplo:

```text
appsettings.example.json
.env.example
```

Estos archivos deben contener únicamente la estructura necesaria y valores de ejemplo.

Ejemplo:

```json
{
  "ConnectionStrings": {
    "InventoryDatabase": "<CONNECTION_STRING>"
  }
}
```

---

# 8. Cambios fuera del alcance

Si durante el desarrollo se detecta:

- Una mejora.
- Un posible refactor.
- Un problema adicional.
- Una dependencia.
- Un cambio arquitectónico.

No debe incluirse automáticamente dentro del trabajo actual.

Debe documentarse por separado indicando:

## Observación

Descripción de lo detectado.

## Posible cambio

Qué podría realizarse.

## Impacto

Qué partes del sistema podrían verse afectadas.

## Estado

Pendiente de aprobación.

Una sugerencia no constituye autorización para modificar el código.

---

# 9. Validación antes de integrar cambios

Antes de integrar un cambio, verificar según corresponda:

- [ ] El proyecto compila.
- [ ] La funcionalidad solicitada funciona.
- [ ] No se modificaron archivos fuera del alcance.
- [ ] No se incluyeron secretos.
- [ ] Los cambios fueron revisados.
- [ ] El commit describe correctamente el cambio.
- [ ] La documentación fue actualizada si corresponde.
