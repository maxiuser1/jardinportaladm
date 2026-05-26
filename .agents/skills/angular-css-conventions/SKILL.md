---
name: angular-css-conventions
description: Convenciones de estilos CSS para Angular. Define reglas sobre dónde y cómo escribir estilos, priorizando clases globales reutilizables de styles.scss, selectores nativos de Angular Material, y el uso de clamp() para responsividad sin media queries.
---

# CSS Conventions

Este skill establece las reglas de escritura de estilos en el proyecto. El objetivo es mantener la base de CSS lo más limpia, predecible y reutilizable posible, evitando la proliferación de clases ad-hoc por componente.

---

## Regla 1 — Cero estilos en el HTML

**Nunca** usar atributos `style="..."` directamente en el template.

```html
<!-- ❌ Incorrecto -->
<div style="margin-top: 16px; font-weight: 600;">Título</div>

<!-- ✅ Correcto -->
<div class="section-title">Título</div>
```

Toda declaración visual debe vivir en un archivo `.scss`.

---

## Regla 2 — Minimizar CSS en componentes; preferir `styles.scss`

Antes de escribir una regla en el `.scss` de un componente, preguntarse:

> ¿Esta regla podría ser útil en otro lugar del proyecto?

Si la respuesta es **sí**, debe ir en `src/styles.scss` como clase global reutilizable.

Solo se escribe CSS en el archivo de componente cuando el estilo es **exclusivo e irrepetible** de ese componente (p. ej.: una disposición de layout muy específica).

```scss
// ✅ En styles.scss — clase reutilizable en cualquier lugar
.page-title {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
}

// ✅ En component.scss — layout propio del componente
:host {
  display: flex;
  flex-direction: column;
  height: 100%;
}
```

---

## Regla 3 — Responsividad: primero Angular Material, luego global

### Paso 1 — Usar directivas y clases nativas de Angular Material

Angular Material expone utilidades de layout y visibilidad de forma nativa. Antes de escribir cualquier CSS responsivo, verificar si Material ya lo resuelve.

Ejemplos de lo que Material provee:
- `fxLayout`, `fxFlex` (si se usa Angular Flex Layout)
- `mat-grid-list` con `[cols]` dinámico
- `[hideXs]`, `[hideSm]` en componentes CDK

### Paso 2 — Clases utilitarias globales en `styles.scss`

Si Material no cubre el caso, definir la clase en `styles.scss` para que sea **reutilizable en todo el proyecto**. Usar `clamp()`, `min()` y `max()` para responsividad sin media queries.

```scss
// styles.scss

// Visibilidad responsive
.xl-hidden {
  @media (min-width: 1024px) {
    display: none !important;
  }
}

.sm-hidden {
  @media (max-width: 1023px) {
    display: none !important;
  }
}
```

> Las media queries en `styles.scss` están permitidas **solo** para las clases utilitarias de visibilidad, ya que su naturaleza es inherentemente un punto de corte. Para todo lo demás, usar `clamp()`.

### Paso 3 — `clamp()` para tamaños fluidos (sin media queries)

Para paddings, font-sizes, gaps y tamaños que deben adaptarse al viewport, usar `clamp(mínimo, preferido, máximo)` en lugar de media queries.

```scss
// ✅ Correcto — fluido, sin media queries
.page-content {
  padding: clamp(16px, 3vw, 24px);
}

h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

// ❌ Incorrecto — media queries por componente
.page-content {
  padding: 16px;
  @media (min-width: 1024px) {
    padding: 24px;
  }
}
```

---

## Regla 4 — Usar selectores de elemento antes que clases custom

Cuando el CSS aplica al elemento de Angular Material directamente, usar el selector de elemento en lugar de agregar una clase al HTML.

```html
<!-- ❌ Incorrecto: clase innecesaria -->
<mat-toolbar class="app-toolbar">...</mat-toolbar>

<!-- ✅ Correcto: sin clase en el HTML -->
<mat-toolbar>...</mat-toolbar>
```

```scss
// ✅ El selector de elemento en el SCSS del componente
mat-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

Aplicar la misma lógica para elementos HTML semánticos: usar `header`, `nav`, `main`, `footer` y targetearlos directamente en el SCSS.

---

## Regla 5 — Clases en el HTML: solo cuando son estrictamente necesarias

Una clase en el template está justificada únicamente en estos casos:

| Caso | Ejemplo |
|---|---|
| Estado dinámico inyectado por Angular | `routerLinkActive="active-link"` |
| Clase utilitaria global de `styles.scss` | `class="xl-hidden"` |
| Clase de layout estructural sin selector alternativo | `class="page-content"` |

Todo lo demás debe resolverse con selectores de elemento o de atributo en el SCSS.

---

## Resumen de jerarquía de decisión

```
¿Necesito un estilo?
│
├─ ¿Lo resuelve Angular Material de forma nativa?
│   └─ ✅ Usarlo directamente (directiva, atributo, clase de Material)
│
├─ ¿Es reutilizable en varios componentes?
│   └─ ✅ Agregar clase global en styles.scss con clamp() / min() / max()
│
├─ ¿Es exclusivo del componente?
│   ├─ ¿Puedo usar el selector de elemento o de atributo?
│   │   └─ ✅ Hacerlo en component.scss sin agregar clase al HTML
│   └─ ¿Necesito sí o sí una clase?
│       └─ ✅ Agregar clase al HTML y definirla en component.scss
│
└─ ¿Ninguna de las anteriores?
    └─ ❌ No agregar style="" en el HTML. Reformular.
```
