---
name: angular-material-components
description: Convenciones y estructuras correctas para usar componentes de Angular Material (v21+, MDC-based / Material 3) en JardinPortal. Define la anatomía obligatoria de cada componente según la documentación oficial, con antipatrones comunes a evitar.
---

# Angular Material Components — Convenciones

Versión de referencia: **Angular Material 21.x (MDC-based, Material Design 3)**.
Documentación oficial: https://material.angular.io/components

---

## Regla General: Siempre leer la documentación del componente

Antes de usar un componente de Angular Material, consultar su sección **Overview** y **API** en la documentación oficial. La arquitectura MDC cambió muchas convenciones respecto a versiones anteriores.

---

## 1. `mat-menu` — Menú desplegable

### Anatomía obligatoria

```html
<!-- 1. El trigger: un botón con [matMenuTriggerFor] apuntando al template ref del menú -->
<button mat-icon-button [matMenuTriggerFor]="miMenu" aria-label="Abrir menú">
  <mat-icon>more_vert</mat-icon>
</button>

<!-- 2. El menú: SIEMPRE fuera de cualquier bloque @if -->
<mat-menu #miMenu="matMenu">
  <!-- Items interactivos: SIEMPRE button o a con mat-menu-item -->
  <button mat-menu-item>
    <mat-icon matMenuItemIcon>edit</mat-icon>
    <span matMenuItemLabel>Editar</span>
  </button>
  <a mat-menu-item href="#">
    <mat-icon matMenuItemIcon>link</mat-icon>
    <span matMenuItemLabel>Ir a página</span>
  </a>
  <mat-divider />
  <button mat-menu-item>
    <mat-icon matMenuItemIcon>logout</mat-icon>
    <span matMenuItemLabel>Cerrar sesión</span>
  </button>
</mat-menu>
```

### Íconos en `mat-menu-item`

En Material 3 (MDC), los íconos y el texto dentro de un `mat-menu-item` **requieren atributos específicos** para que el layout sea correcto:

| Elemento | Atributo correcto |
|---|---|
| `mat-icon` que precede al texto | `matMenuItemIcon` |
| `span` con el label del ítem | `matMenuItemLabel` |

```html
<!-- ✅ Correcto (Material 3 / MDC) -->
<button mat-menu-item>
  <mat-icon matMenuItemIcon>delete</mat-icon>
  <span matMenuItemLabel>Eliminar</span>
</button>

<!-- ❌ Incorrecto — sin atributos MDC, el layout se rompe -->
<button mat-menu-item>
  <mat-icon>delete</mat-icon>
  <span>Eliminar</span>
</button>
```

### Contenido no interactivo dentro del menú (cabecera de usuario, etc.)

Para incluir contenido que NO sea un ítem accionable (como info del usuario autenticado), usar `ng-template` con `matMenuContent` o simplemente no mezclar con los ítems. La opción más compatible con Material es usar un `mat-menu-item` con `[disabled]="true"` y clase custom:

```html
<mat-menu #profileMenu="matMenu">
  <!-- Cabecera no interactiva: mat-menu-item disabled -->
  <button mat-menu-item disabled class="menu-user-header">
    <span matMenuItemLabel>
      <strong>Juan Pérez</strong>
      <small>juan@example.com</small>
    </span>
  </button>
  <mat-divider />
  <button mat-menu-item (click)="cerrarSesion()">
    <mat-icon matMenuItemIcon>logout</mat-icon>
    <span matMenuItemLabel>Cerrar sesión</span>
  </button>
</mat-menu>
```

> **Importante:** No colocar `<div>` sueltos dentro de `mat-menu`. Solo `button[mat-menu-item]`, `a[mat-menu-item]`, `mat-divider` y `ng-template[matMenuContent]`.

### Ubicación del `mat-menu` en el template

El `<mat-menu>` debe estar **al mismo nivel o en un nivel superior** al botón trigger, **nunca dentro de un `@if`** que condicione la existencia del trigger:

```html
<!-- ❌ Incorrecto: mat-menu dentro de @if junto con el trigger -->
@if (sesion.autenticado()) {
  <button [matMenuTriggerFor]="menu">...</button>
  <mat-menu #menu="matMenu">...</mat-menu>
}

<!-- ✅ Correcto: mat-menu fuera del @if -->
@if (sesion.autenticado()) {
  <button [matMenuTriggerFor]="profileMenu">...</button>
}
<mat-menu #profileMenu="matMenu">...</mat-menu>
```

### Importación en el componente

```typescript
import { MatMenuModule } from '@angular/material/menu';
// o importar individualmente:
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
```

---

## 2. `mat-toolbar` — Barra de navegación

```html
<mat-toolbar>
  <button mat-icon-button aria-label="Menú lateral">
    <mat-icon>menu</mat-icon>
  </button>
  <span>Mi aplicación</span>
  <span class="espaciador"></span>
  <!-- Acciones a la derecha -->
</mat-toolbar>
```

El espaciador para separar contenido izquierdo/derecho:
```scss
// styles.scss o component.scss
.espaciador {
  flex: 1 1 auto;
}
```

---

## 3. `mat-sidenav` — Panel lateral

```html
<mat-sidenav-container>
  <mat-sidenav
    #sidenav
    [mode]="isDesktop() ? 'side' : 'over'"
    [opened]="opened()"
  >
    <!-- Contenido del sidenav -->
  </mat-sidenav>

  <mat-sidenav-content>
    <mat-toolbar>...</mat-toolbar>
    <router-outlet />
  </mat-sidenav-content>
</mat-sidenav-container>
```

---

## 4. `mat-form-field` — Campos de formulario

En Material 3, `mat-form-field` **requiere** que los inputs usen `matInput`:

```html
<!-- ✅ Correcto -->
<mat-form-field>
  <mat-label>Correo electrónico</mat-label>
  <input matInput type="email" [formControl]="correo" />
  <mat-error>Ingrese un correo válido</mat-error>
</mat-form-field>

<!-- Select dentro de form-field -->
<mat-form-field>
  <mat-label>Forma de pago</mat-label>
  <mat-select>
    <mat-option value="MENSUAL">Mensual</mat-option>
    <mat-option value="ANUAL">Anual</mat-option>
  </mat-select>
</mat-form-field>
```

> **Regla:** Usar siempre `appearance="outline"` (Material 3 default). No usar `appearance="legacy"`.

---

## 5. `mat-button` — Variantes de botón

| Variante | Uso recomendado |
|---|---|
| `mat-button` | Acción terciaria, links de texto |
| `mat-stroked-button` | Acción secundaria |
| `mat-flat-button` | Acción primaria |
| `mat-icon-button` | Íconos solos (toolbar, listas) |
| `mat-fab` | Acción principal flotante |
| `mat-mini-fab` | FAB compacto |

```html
<button mat-flat-button color="primary">Guardar</button>
<button mat-stroked-button>Cancelar</button>
<button mat-icon-button aria-label="Eliminar">
  <mat-icon>delete</mat-icon>
</button>
```

> **Importante:** `mat-icon-button` **siempre** debe incluir `aria-label` para accesibilidad.

---

## 6. `mat-card` — Tarjeta de contenido

```html
<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Título</mat-card-title>
    <mat-card-subtitle>Subtítulo</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <!-- Contenido -->
  </mat-card-content>
  <mat-card-actions align="end">
    <button mat-button>Cancelar</button>
    <button mat-flat-button color="primary">Aceptar</button>
  </mat-card-actions>
</mat-card>
```

---

## 7. `mat-table` — Tabla de datos

```html
<table mat-table [dataSource]="dataSource">
  <!-- Columna -->
  <ng-container matColumnDef="nombre">
    <th mat-header-cell *matHeaderCellDef>Nombre</th>
    <td mat-cell *matCellDef="let row">{{ row.nombre }}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```

---

## 8. Antipatrones globales

```html
<!-- ❌ div suelto dentro de mat-menu -->
<mat-menu>
  <div class="header">...</div>
</mat-menu>

<!-- ❌ mat-icon sin matMenuItemIcon dentro de mat-menu-item -->
<button mat-menu-item>
  <mat-icon>logout</mat-icon>
  <span>Salir</span>
</button>

<!-- ❌ mat-menu dentro de @if con el trigger -->
@if (condicion) {
  <button [matMenuTriggerFor]="m">...</button>
  <mat-menu #m>...</mat-menu>
}

<!-- ❌ appearance="legacy" en mat-form-field -->
<mat-form-field appearance="legacy">

<!-- ❌ mat-icon-button sin aria-label -->
<button mat-icon-button>
  <mat-icon>settings</mat-icon>
</button>
```
